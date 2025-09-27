import React, {useEffect, useState} from 'react'


export default function App(){
const [users,setUsers] = useState([])
const [name,setName] = useState('')
const [email,setEmail] = useState('')


useEffect(()=>{
fetch('/api/users')
.then(r=>r.json())
.then(setUsers)
},[])


const add = async ()=>{
const res = await fetch('/api/users',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email})})
const newUser = await res.json()
setUsers(u=>[...u,newUser])
}


return (
<div style={{padding:24}}>
<h1>Users</h1>
<ul>
{users.map(u=> <li key={u.id}>{u.name} — {u.email}</li>)}
</ul>
<div>
<input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
<input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<button onClick={add}>Add</button>
</div>
</div>
)
}
