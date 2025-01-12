# LockedIn AI

Stay consistent, stay accountable, and make productivity fun by placing bets on your own streaks. If you break a streak, others who bet against you win the pot. If you succeed, you keep your money—and may even earn more!

---

## Inspiration

We all struggle with staying consistent and productive, even when we have the best intentions. **LockedIn AI** was inspired by this challenge—merging accountability with a fun betting mechanism to make productivity more engaging and rewarding.

---

## What It Does

1. **Set Streaks**: Users define tasks and how many consecutive days they want to complete them.  
2. **Place Bets** *(Optional)*: Users can stake money on their own success.  
3. **Win or Lose**: 
   - If the user’s streak breaks, the opponents who bet against them win the money.  
   - If the user succeeds, they keep their bet and may even earn more.  
4. **Do Good**: Excess funds will support wildfire relief efforts in LA.

---

## How We Built It

- **Frontend**:  
  - **TypeScript** for type safety.  
  - **React** for building a dynamic user interface.  
  - **Tailwind CSS** for fast and consistent styling.  
  - **Google Auth** API for secure user authentication.

- **Backend**:  
  - **Python** with **Flask** (initially) but migrated to **React** for a better UI/UX.  
  - **Dify.ai** for LLM orchestration.  
  - **PayPal API** for secure transaction handling.  
  - **MySQL** for data storage.

---

## Challenges We Ran Into

- **Version Control**: Most of the team was new to Git collaboration, leading to merge conflicts and confusion early on.  
- **Tech Stack Pivot**: Started with Python Flask for the entire project but switched to React for the frontend due to its superior UI/UX capabilities. This required us to redo a significant portion of the codebase halfway through.

---

## Accomplishments We're Proud Of

1. **First Hackathon**: Stepping into hackathon territory was a big milestone for our entire team.  
2. **Team Resilience**: We fought through moments of wanting to quit, holding ourselves accountable—just like our app helps users do.  
3. **Learning & Adapting**: We successfully switched to React mid-project and made it work under time constraints.

---

## What We Learned

- **Flexibility**: Embracing new frameworks and tools (like React) on the fly can be a game-changer.
- **Collaboration**: Team communication and proper Git workflows are vital for smooth development.
- **Accountability**: Building a product that revolves around accountability taught us how to keep ourselves accountable in real-time.

---

## What's Next

- **Social Features**: Leaderboards, the ability to follow friends, and bet on their streaks.
- **Refined Betting Mechanics**: Expand betting options and potential reward tiers.
- **Scaling for Impact**: Continue channeling excess funds to support wildfire relief efforts, and possibly other charitable causes.

---

## Built With

- [dify.ai](https://dify.ai/)  
- [Flask](https://flask.palletsprojects.com/)  
- [Google Auth](https://developers.google.com/identity)  
- [MySQL](https://www.mysql.com/)  
- [PayPal](https://developer.paypal.com/docs/api/overview/)  
- [Python](https://www.python.org/)  
- [React](https://reactjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [TypeScript](https://www.typescriptlang.org/)

---

## Getting Started

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/LockedIn-AI.git
   cd LockedIn-AI
