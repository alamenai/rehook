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
## Use Cookie
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

* `key`:_string_
* `value`:_string_
* `options`:_CookieOptions_




