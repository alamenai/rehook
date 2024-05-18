<h1 align='center'>Rehook</h1>

<h3 align='center'>Copy, Paste & Customize your hook.</h3>
<h4 align='center'><a href="https://github.com/alamenai/rehook/tree/main/src/hooks" target="_blank" >Browse hooks</a></h4>

# What is Rehook?

Rehook offers a curated collection of custom hooks designed to streamline your development process by eliminating the need to repeatedly implement the same hooks across different projects. With Rehook, all it takes is a simple copy, paste, and customization to enhance your projects effortlessly.

<b>It's not a library or a package to install.</b>

# Get Started

Jhon: In my React project , I want a ready-to-use hook for handling cookies but I would change it later.

Me: OKAY. Just copy and paste `useCookie` hook from [use-cookie](https://github.com/alamenai/rehook/blob/main/src/hooks/use-cookie.ts) and do your changes. That's it!

For more hooks just browse the [hooks](https://github.com/alamenai/rehook/tree/main/src/hooks) folder.

# Hooks

> I would recommend creating a folder called `hooks` inside your project to store all the hooks in one place.

## 1. Use Cookie

Use Cookie allows you to manage the web cookies.

### Add hook

2. Create a file `use-cookie.ts` and copy & paste the code from [use-cookie](https://github.com/alamenai/rehook/blob/main/src/hooks/use-cookie.ts).

### Usage

#### Add new cookie

```jsx
import './App.css'
import { getCookie, setCookie } from './hooks/use-cookie'

function App() {
    const addCookie = (key: string, value: string, options: any) => {
        setCookie('pass-key', 'xyz', options)
    }

    return (
        <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={addCookie('pass-key', 'xyz', {})}>Add Cookie</button>
        </div>
    )
}

export default App

```

![image](https://github.com/alamenai/rehook/assets/20143684/dc7b3c1e-5d1f-4ea4-9af0-b764653b1017)

#### Get a cookie

```jsx
import './App.css'
import { getCookie } from './hooks/use-cookie'

function App() {
    const logCookie = (key: string) => () => {
        const cookie = getCookie(key)
        console.log(cookie) // output: xyz
    }

    return (
        <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={logCookie('pass-key')}>Log Cookie</button>
        </div>
    )
}

export default App


```

#### API

##### `setCookie`

**Desscription**

**Type**

Function

**Parameters**

-   `key`:_string_
-   `value`:_string_
-   `options`:_CookieOptions_


## 2. Use Unsaved Form Changes

The useUnsavedFormChanges hook is a custom React hook designed to track unsaved changes in a form. It provides functionalities to monitor changes made to form data and alert users if they attempt to leave the page without saving.

### Add hook

2. Create a file `use-usaved-form-changes.ts` and copy & paste the code from [use-unsaved-form-changes](https://github.com/alamenai/rehook/blob/main/src/hooks/use-unsaved-form-changes.ts).

### Usage

#### Track unsaved changes

```jsx

import { useUnsavedFormChanges } from './hooks/use-unsaved-form-changes'
import { useState, SyntheticEvent } from 'react'

function App() {
    const [formData, setFormData] = useState('') // Assuming your form data is stored in state
    const { setFormChanged } = useUnsavedFormChanges()

    const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
        // Update form data and mark as changed
        setFormData(event.currentTarget.value)
        setFormChanged(true)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 900, gap: 10, fontSize: 24 }}>
            <input
                type="text"
                name="example"
                value={formData}
                onChange={handleChange}
                style={{ height: 44, width: 280, fontSize: 18, paddingInline: 12 }}
            />
            <button>Save</button>
        </div>
    )
}

export default App

```

#### API

##### `setFormChanged(newValue: boolean): void`

**Desscription**

The `setFormChanged` function is a part of the custom hook useUnsavedFormChanges. It is responsible for updating the state to indicate whether the form has been changed or not.

When invoked with a boolean value (true or false), it updates the internal state accordingly, reflecting whether changes have been made to the form data.

**Parameters**

`newValue (boolean)`: The new value indicating whether the form has been changed (true) or not (false).

**Returns**

`void`: This function does not return any value.


##### `isFormChanged: booleand`

**Desscription**

The `isFormChanged` variable is a part of the custom hook useUnsavedFormChanges. It represents whether the form has been changed or not. When the form data is modified, this variable is updated accordingly to indicate that changes have been made.

**Returns**

`boolean`: The current state of whether the form has been changed. If changes have been made to the form data, it returns true; otherwise, it returns false.
