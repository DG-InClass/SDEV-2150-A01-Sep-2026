# Practice - Custom Elements

The [homework](./homework-02.md) from Lesson 02 on Custom Elements (aka Web Components), has no starter kit. It's a "build from scratch" project. It's also a "continuing" project, with homework that comes from subsequent lessons.

## Project Setup

1. Create the project with minimal dependencies

    ```ps
    pnpm init
    pnpm add -D vite
    pnpm add @picocss/pico
    ```

    > The inclusion of [Pico CSS](https://picocss.com/) is for some quick Classless styling.

2. Update the `package.json` to add **"dev"**, "build", and "preview" scripts.

    ```diff
    -     "test": "echo \"Error: no test specified\" && exit 1"
    +     "dev": "vite",
    +     "build": "vite build",
    +     "preview": "vite preview"
    ```

3. Create a minimal `index.html` and `js/main.js`
4. Start the dev server (`pnpm dev`) and begin the homework.

## Homework 02

