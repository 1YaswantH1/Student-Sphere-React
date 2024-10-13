import { useState, useEffect } from 'react';
import '../css/polls.css';

const Polls = () => {
    const [polls, setPolls] = useState([]); // State to hold polls
    const [pollQuestion, setPollQuestion] = useState(''); // State for poll question
    const [pollOptions, setPollOptions] = useState(''); // State for poll options

    // Load polls from local storage when the component mounts
    useEffect(() => {
        const savedPolls = JSON.parse(localStorage.getItem('polls')) || [];
        setPolls(savedPolls);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        const optionsArray = pollOptions.split(',').map(option => option.trim());

        if (pollQuestion && optionsArray.length > 0) {
            // Create a new poll object
            const newPoll = {
                id: Date.now(),
                question: pollQuestion,
                options: optionsArray.map(option => ({ name: option, votes: 0 }))
            };

            // Update polls state
            const updatedPolls = [...polls, newPoll];
            setPolls(updatedPolls);
            // Update local storage
            localStorage.setItem('polls', JSON.stringify(updatedPolls));

            // Clear form fields
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
        <div className="container">
            <h1 className="heading1">Create and Vote on Polls</h1>
            <div className="form-container">
                <h2 className="heading2">Add New Poll</h2>
                <form id="pollForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label-text" htmlFor="pollQuestion">Poll Question:</label>
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

                    <div className="form-group">
                        <label className="label-text" htmlFor="pollOptions">Options (comma-separated):</label>
                        <input
                            className="poll-input"
                            type="text"
                            id="pollOptions"
                            name="pollOptions"
                            value={pollOptions}
                            placeholder="Option1, Option2, Option3"
                            onChange={(e) => setPollOptions(e.target.value)}
                            required
                        />
                    </div>

                    <button className="add-poll-button" type="submit">Add Poll</button>
                </form>
            </div>

            <div className="poll-list">
                <h2 className="heading2">Polls</h2>
                <ul className="polls-container">
                    {polls.map(poll => (
                        <li className="poll-item" key={poll.id}>
                            <div className="poll-details">
                                <strong>{poll.question}</strong>
                                <div className="poll-options">
                                    {poll.options.map((option, index) => (
                                        <div className="poll-option" key={index}>
                                            <span>{option.name}</span>
                                            <button className="vote-button" onClick={() => vote(poll.id, index)}>Vote</button>
                                            <span className="votes">{option.votes} votes</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="delete-poll" onClick={() => deletePoll(poll.id)}>Delete Poll</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Polls;
