# Contributing to Rehook

Thank you for your interest in contributing to Rehook! I appreciate your support and look forward to your contributions. This guide will help you understand the directory structure and provide detailed instructions on how to add a new hook to Rehook.

Once done, open a pull request from your forked repo to the main repo [here](https://github.com/alamenai/rehook/compare).

## Getting Started

### Fork and Clone the Repository

1. **Fork this repository**  
   Click [here](https://github.com/alamenai/rehook/fork) to fork the repository.

2. **Clone your forked repository to your local machine**

    ```bash
    git clone https://github.com/<YOUR_USERNAME>/rehook.git
    ```

3. **Navigate to the project directory**

    ```bash
    cd rehook
    ```

4. **Create a new branch for your changes**

    ```bash
    git checkout -b my-new-branch
    ```

5. **Install dependencies**

    ```bash
    npm install
    ```

6. **Run the project**
    ```bash
    npm run dev
    ```

## Adding a New Hook

To add a new hook to Rehook, you will need to modify several files. Follow these steps:

### 1. Create Your Hook

**File:** `src/hooks/use-example.ts`

Create the hook file.

```ts
const useExample = () => {
    // Your code here
}
```

### 2. Add Your Unit Testing

**File:** `src/hooks/__tests__/use-example.spec.ts`

```ts
describe('useExample', () => {
    // Your test cases here
})
```

### 3.Document Your Hook

Go to [rehook-wesbite](https://github.com/alamenai/rehook-website) repository and clone it.

#### 3.1 Create MDX page

**File:** `pages/hooks/use-example.mdx`

```mdx
# useExample

<h3 className="mt-4 text-xl font-normal text-gray-400">Description.</h3>

## Add hook

Create a file `use-example.ts` and copy & paste the code from [useExample](/hooks/use-example#hook).

## Usage

function App() {
const {example} = useExample()
}

export default App

### Hook

const Example = ()=>{

    // Your hook code here

}

export default Example

## API

{' '}

<h3 className="text-xl font-medium mt-6">Parameters</h3>

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| `name`    | `type` | Description. |
|           |

{' '}

<h3 className="text-xl font-medium mt-6">Returns</h3>

| Name   | Type   | Description  |
| ------ | ------ | ------------ |
| `name` | `type` | Description. |
```

#### 3.2 Add Page Meta

**File:** `pages/hooks/_meta.json`

```json

"use-example":"useExample"

```

#### 3.3 Add Sidebar New Badge

**File:** `theme.config.tsx`

```tsx
  sidebar: {
    titleComponent({ title, type }) {
      return (
        <div className="flex items-center justify-between relative w-full">
          <div>{title}</div>
          {(title === "useExample"
           ) && (
            <Badge className=" absolute -right-[0.5em] bg-transparent border-lime-400 text-lime-500 px-[0.5em] hover:bg-transparent">
              New
            </Badge>
          )}
          {title === "useFetch" && (
            <Badge className=" absolute -right-[0.5em] bg-transparent border-pink-500 text-pink-500 px-[0.5em] hover:bg-transparent">
              Updated
            </Badge>
          )}
        </div>
      );
    },
  },

```

## Ask for Help

For any help or questions, please open a new GitHub issue and we will get back to you :)
