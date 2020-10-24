import React, { useState, useEffect } from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Stars',
    dataIndex: 'stars',
    key: 'stars',
  },
  {
    title: 'forks',
    dataIndex: 'forks',
    key: 'forks',
  },
  {
    title: 'Language',
    dataIndex: 'language',
    key: 'language',
  },
];

const App = () => {
  const [name, setName] = useState('');
  const [limit, setLimit] = useState(30);
  const [source, setSource] = useState();

  function getRepos () {
    fetch(`https://api.github.com/users/${name}/repos`)
      .then(res => res.json())
      .then(
        (result) => {
          handleSource(result)
        },
        (error) => {

        }
      )
  }

  function handleSource (data) {
    if (!data || !data.length) {
      setSource([])
      return
    }

    const arr = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      let date = new Date()
      let partDate = date.getDate() - limit;
      date.setDate(partDate)
      
      if(Date.parse(arr[i].created_at) >= Date.parse(date))
      {
        result.push({
          key: i + 1,
          name: arr[i]?.name,
          description: arr[i]?.description,
          stars: arr[i]?.stargazers_count,
          forks: arr[i]?.forks_count,
          language: arr[i]?.language
        })
      }
    }
    setSource(result.slice(0,10))
  }

  useEffect(getRepos, [])

  return (
    <>
      <h2>"Repos GitHub" : please enter user name you want to search.</h2>
      Username : <input type="text" onChange={(e) => setName(e.target.value)} />
      Limit Date : <input type="number" onChange={(e) => setLimit(e.target.value)} pattern="[0-9]" />
      <button onClick={getRepos}>Search</button>
      <Table dataSource={source} columns={columns} />;
    </>
  );
}

export default App;
