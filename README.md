# What is this?

## Animal Vegetable Mineral

This is a naive bayesian classifier, which means that it's a very simple machine learning algorithm. It is designed to be a quick demonstration for people who want to learn more about machine learning but don't really know where to start. It works a lot like cleverbot except that instead of learning how to make conversation, it's learning to categorize using the old game animal, vegetable, or mineral.

I have loaded the bot with several libraries of plants and animals and minerals, but it still has a lot to learn. When you enter a word that the bot doesn't know, instead of guessing, it will ask you whether it is an animal, a vegetable, or a mineral. Your feedback trains the bot and the next time you ask it that question (or someone else does) it may have a better guess than it did the last time.

If it does know, or if it has a guess, it will tell you it's answer and ask you if it was correct. If it was right (and you tell it that it was right) it will use reinforcement learning to make stronger connections for that guess. If it was wrong you can re-train it to learn the right answer.

Your feedback trains the bot!
