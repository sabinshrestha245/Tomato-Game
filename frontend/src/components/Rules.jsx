import React from 'react';

/**
 * Component that displays the rules of the Tomato Number Game.
 * @function Rules
 * @returns {JSX.Element} - Rendered component.
 */
function Rules() {
  return (
    <div>
      <h2>Rules</h2>
      <p>
        1. You will be given a question and you need to enter the correct
        solution.
      </p>
      <p>2. Each correct solution will increase your score by 10 points.</p>
      <p>
        3. If you enter an incorrect solution, your score will decrease by 6
        points.
      </p>
      <p>
        4. You can skip a question, but your score will decrease by 3
        points.
      </p>
      <p>
        5. Each round lasts for 30 seconds. If you don't submit a solution
        within the time limit, you will automatically proceed to the next
        round.
      </p>
      <p>
        6. The game ends when you have completed all rounds or when you
        click the "Exit Game" button.
      </p>
    </div>
  );
}

export default Rules;
