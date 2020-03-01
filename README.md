# Errand List Coding Challenge

Hello and thank you for the opportunity to work and showcase my coding skills to you! This challenge was both exciting and challenging for me! One of the biggest challenges for me was nesting list items. This was a new concept for me but I was fortunately able to push through and learn how to do it.  :relieved:


## PURPOSE

The Errand List is a todo app where you can keep all your errands and todos organized in one place.

![Todo Gif](./public/images/appGif.gif)


## BUILT WITH:

* React JS
* Local Storage
* Short Id, ID Generator
* Pure CSS


## DEPLOYED TO:
[Heroku](https://errand-list.herokuapp.com)


## FUTURE DEVELOPMENTS:

Given the time constraints the following were not completed:

* If a parent task is marked as completed, all sub-task should automatically be marked as completed. On line 98-100 you can see where I commented out part of the function I was beginning to write. It's currently only marking off index 0 of the parent's child. I need to be able to check if there is more than one child and complete them as well.

* If all child tasks of a parent are marked as completed, the parent should automatically be marked as complete. On line 114-116 you can see my code again commented out. It's currently completing the parent task when checked off by one child, but if there is more than one child, it's not checking if they are completed. 

* Collapsible Children Tasks