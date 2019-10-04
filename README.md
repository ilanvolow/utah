##Utah.ts Beachstorming & Prototyping System###

Utah.ts is backend prototyping system based on Express.js that's designed help you quickly creating a backend system for protyping new applcations/microservices, mainly those targeting native mobile applications.

### Getting Started:

Prerequisites:



Install generator
 
```npm install -g utah-generator```

Generate project

```utah myproject```

Install Visual Studio Code if you don't already have it.

Install the VSCode extension to get command autocompletion.



### Philosophy: ###

Utah is designed to come back a number of shortcomings I've found with existing systems:


1. It's really a pain in the butt to set up Express for a 5 minute project.
2. It's really, really a pain in the butt to set up Express to use Typescript.
3. It's really, really, realy a pain in the butt set up debugging for Typescript applications in Express that can be easily done in VSCode
4. It's really, really, really, really a pain in the butt to set up unit testing for Typescript for Express.
5. It's really, really, really, really, really a pain in the butt to get people on other teams to document their stuff in Swagger.

Approach:

1. Utah.ts is hyper-opinionated. You're weclome and our apologies, your pick.
2. We require Visual Studio Code. Utah.ts is a system, not a framework.
3. Utah demands you document your stuff up front.
4. We use JSX. Stuff that never changes during execution shouldn't be in code, and JSX is enough not like code that it can meet this criteria for now.
5. Get the user using your stuff right away.
6. Write lots of documentation. Documentation is what makes or breaks a programming technology. One line of documentation is worth 10 lines of code.

Utah.ts is designed to get the MVP backend prototype up and running in five minutes. It won't even run a FAANG company--and that's okay. 
