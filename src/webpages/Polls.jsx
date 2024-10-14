// import { useState, useEffect } from 'react';
// import '../css/polls.css';

// const Polls = () => {
//   const [polls, setPolls] = useState([]);
//   const [pollQuestion, setPollQuestion] = useState('');
//   const [pollOptions, setPollOptions] = useState('');

//   useEffect(() => {
//     const savedPolls = JSON.parse(localStorage.getItem('polls')) || [];
//     setPolls(savedPolls);

//     // Change body background color
//     document.body.style.backgroundColor = '#023047';

//     return () => {
//       // Reset body background color on component unmount
//       document.body.style.backgroundColor = '';
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const optionsArray = pollOptions.split(',').map(option => option.trim());

//     if (pollQuestion && optionsArray.length > 0) {
//       const newPoll = {
//         id: Date.now(),
//         question: pollQuestion,
//         options: optionsArray.map(option => ({ name: option, votes: 0 })),
//       };

//       const updatedPolls = [...polls, newPoll];
//       setPolls(updatedPolls);
//       localStorage.setItem('polls', JSON.stringify(updatedPolls));
//       setPollQuestion('');
//       setPollOptions('');
//     }
//   };

//   const deletePoll = (id) => {
//     const updatedPolls = polls.filter(poll => poll.id !== id);
//     setPolls(updatedPolls);
//     localStorage.setItem('polls', JSON.stringify(updatedPolls));
//   };

//   const vote = (pollId, optionIndex) => {
//     const updatedPolls = polls.map(poll => {
//       if (poll.id === pollId) {
//         const updatedOptions = poll.options.map((option, index) => {
//           if (index === optionIndex) {
//             return { ...option, votes: option.votes + 1 };
//           }
//           return option;
//         });
//         return { ...poll, options: updatedOptions };
//       }
//       return poll;
//     });

//     setPolls(updatedPolls);
//     localStorage.setItem('polls', JSON.stringify(updatedPolls));
//   };

//   return (
//     <div className="polls-container">
//       <h1 className="polls-heading">Create and Vote on Polls</h1>
//       <div className="poll-form-container">
//         <h2 className="polls-subheading">Add New Poll</h2>
//         <form id="pollForm" onSubmit={handleSubmit}>
//           <div className="poll-form-group">
//             <label className="poll-label" htmlFor="pollQuestion">Poll Question:</label>
//             <input
//               className="poll-input"
//               type="text"
//               id="pollQuestion"
//               name="pollQuestion"
//               value={pollQuestion}
//               onChange={(e) => setPollQuestion(e.target.value)}
//               required
//             />
//           </div>

//           <div className="poll-form-group">
//             <label className="poll-label" htmlFor="pollOptions">Options (comma-separated):</label>
//             <input
//               className="poll-input"
//               type="text"
//               id="pollOptions"
//               name="pollOptions"
//               value={pollOptions}
//               placeholder="Option1, Option2, Option3"
//               onChange={(e) => setPollOptions(e.target.value)}
//               required
//             />
//           </div>

//           <button className="poll-add-button" type="submit">Add Poll</button>
//         </form>
//       </div>

//       <div className="poll-list">
//         <h2 className="polls-subheading">Polls</h2>
//         <ul className="polls-list">
//           {polls.map(poll => {
//             const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0); // Calculate total votes for the poll
//             const maxVotes = Math.max(...poll.options.map(option => option.votes)); // Find the max votes

//             return (
//               <li className="poll-item" key={poll.id}>
//                 <div className="poll-details">
//                   <strong>{poll.question}</strong>
//                   <div className="poll-options">
//                     {poll.options.map((option, index) => {
//                       const votePercentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0; // Calculate percentage
//                       const isMajority = option.votes === maxVotes && maxVotes > 0; // Check if the option has the most votes

//                       return (
//                         <div className="poll-option" key={index}>
//                           <span>{option.name}</span>
//                           <div className="histogram-bar-container">
//                             <div
//                               className="histogram-bar"
//                               style={{
//                                 width: `${votePercentage}%`,
//                                 backgroundColor: isMajority ? 'green' : 'red', // Green for majority, red for others
//                               }}
//                             />
//                           </div>
//                           <span className="poll-votes">{option.votes} votes</span>
//                           <button className="poll-vote-button" onClick={() => vote(poll.id, index)}>Vote</button>
//                         </div>
//                       );
//                     })}
//                   </div>
//                   <button className="poll-delete-button" onClick={() => deletePoll(poll.id)}>Delete Poll</button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Polls;
import { useState, useEffect } from 'react';
import '../css/polls.css';

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState('');

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
    const updatedPolls = polls.map(poll => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map((option, index) => {
          if (index === optionIndex) {
            return { ...option, votes: option.votes + 1 };
          }
          return option;
        });
        return { ...poll, options: updatedOptions };
      }
      return poll;
    });

    setPolls(updatedPolls);
    localStorage.setItem('polls', JSON.stringify(updatedPolls));
  };

  return (
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
              placeholder="Enjoyed, Good, Bad"
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
            const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0); // Total votes
            const maxVotes = Math.max(...poll.options.map(option => option.votes)); // Maximum votes in this poll

            return (
              <li className="poll-item" key={poll.id}>
                <div className="poll-details">
                  <strong>{poll.question}</strong>
                  <div className="poll-options">
                    {poll.options.map((option, index) => {
                      const votePercentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0; // Percentage
                      const isMajority = option.votes === maxVotes && maxVotes > 0; // Check for majority

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
                          <button className="poll-vote-button" onClick={() => vote(poll.id, index)}>Vote</button>
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
  );
};

export default Polls;

