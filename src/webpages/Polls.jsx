import { useState, useEffect } from 'react';
import '../css/polls.css';
import NavBar from '../components/Navbar';

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState('');
  const [votedPolls, setVotedPolls] = useState(JSON.parse(localStorage.getItem('votedPolls')) || []);

  useEffect(() => {
    const savedPolls = JSON.parse(localStorage.getItem('polls')) || [];
    setPolls(savedPolls);

    // Change body background color
    document.body.style.backgroundColor = '#023047';

    return () => {
      // Reset body background color on component unmount
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const optionsArray = pollOptions.split(',').map(option => option.trim());

    if (pollQuestion && optionsArray.length > 0) {
      const newPoll = {
        id: Date.now(),
        question: pollQuestion,
        options: optionsArray.map(option => ({ name: option, votes: 0 })),
      };

      const updatedPolls = [...polls, newPoll];
      setPolls(updatedPolls);
      localStorage.setItem('polls', JSON.stringify(updatedPolls));
      setPollQuestion('');
      setPollOptions('');
    }
  };

  const deletePoll = (id) => {
    const updatedPolls = polls.filter(poll => poll.id !== id);
    setPolls(updatedPolls);
    localStorage.setItem('polls', JSON.stringify(updatedPolls));
  };

  const vote = (pollId, optionIndex) => {
    let updatedPolls = polls.map(poll => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map((option, index) => {
          if (index === optionIndex) {
            // Check if the user has already voted on this option
            if (votedPolls.includes(pollId)) {
              // If already voted, remove the vote
              return { ...option, votes: option.votes - 1 };
            } else {
              // If not yet voted, add the vote
              return { ...option, votes: option.votes + 1 };
            }
          }
          return option;
        });
        return { ...poll, options: updatedOptions };
      }
      return poll;
    });

    // Update voted polls in local storage and state
    let updatedVotedPolls;
    if (votedPolls.includes(pollId)) {
      // Remove the poll ID if the vote is being undone
      updatedVotedPolls = votedPolls.filter(id => id !== pollId);
    } else {
      // Add the poll ID if this is a new vote
      updatedVotedPolls = [...votedPolls, pollId];
    }

    setPolls(updatedPolls);
    setVotedPolls(updatedVotedPolls);
    localStorage.setItem('polls', JSON.stringify(updatedPolls));
    localStorage.setItem('votedPolls', JSON.stringify(updatedVotedPolls));
  };

  return (
    <>
      <NavBar />
      <div className="polls-container">
        <h1 className="polls-heading">Create and Vote on Polls</h1>
        <div className="poll-form-container">
          <h2 className="polls-subheading">Add New Poll</h2>
          <form id="pollForm" onSubmit={handleSubmit}>
            <div className="poll-form-group">
              <label className="poll-label" htmlFor="pollQuestion">Poll Question:</label>
              <input
                className="poll-input"
                type="text"
                id="pollQuestion"
                name="pollQuestion"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                required
              />
            </div>

            <div className="poll-form-group">
              <label className="poll-label" htmlFor="pollOptions">Options (comma-separated):</label>
              <input
                className="poll-input"
                type="text"
                id="pollOptions"
                name="pollOptions"
                value={pollOptions}
                placeholder="comma-separated-values"
                onChange={(e) => setPollOptions(e.target.value)}
                required
              />
            </div>

            <button className="poll-add-button" type="submit">Add Poll</button>
          </form>
        </div>

        <div className="poll-list">
          <h2 className="polls-subheading">Polls</h2>
          <ul className="polls-list">
            {polls.map(poll => {
              const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
              const maxVotes = Math.max(...poll.options.map(option => option.votes));
              const hasVoted = votedPolls.includes(poll.id);

              return (
                <li className="poll-item" key={poll.id}>
                  <div className="poll-details">
                    <strong>{poll.question}</strong>
                    <div className="poll-options">
                      {poll.options.map((option, index) => {
                        const votePercentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                        const isMajority = option.votes === maxVotes && maxVotes > 0;

                        return (
                          <div className="poll-option" key={index}>
                            <span className="option-name">{option.name}</span>
                            <div className="histogram-bar-container">
                              <div
                                className="histogram-bar"
                                style={{
                                  width: `${votePercentage}%`,
                                  backgroundColor: isMajority ? 'green' : (option.votes > 0 ? 'red' : 'gray'),
                                }}
                              />
                            </div>
                            <span className="poll-votes">{option.votes} votes</span>
                            <button
                              className="poll-vote-button"
                              onClick={() => vote(poll.id, index)}
                              disabled={hasVoted}
                            >
                              {hasVoted ? 'Voted' : 'Vote'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <button className="poll-delete-button" onClick={() => deletePoll(poll.id)}>Delete Poll</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Polls;
