/**@jsx jsx*/
import {jsx} from "@emotion/core";
import {Button, Input, Form, FormGroup} from 'reactstrap'
import {useState} from 'react'
import axios from 'axios'
import check from 'check-types'

const CorsTestForm = () => {
  const [url, setUrl] = useState('')
  const [res, setRes] = useState('')
  const [error, setError] = useState('')

  const onClickGetRequest = async () => {
    if (url) {
      try {
        const res = await axios.get(url)
        setRes(check.object(res) ? JSON.stringify(res, undefined, 4) : res)
        console.log('response: ', res)
      } catch (e) {
        setError(e.toString())
        console.log('Error: ', e)
      }
    }
  }
  const onClickClearButton = () => {
    setRes('')
    setError('')
  }
  const onClickLink = async (e) => {
    e.preventDefault()
    setUrl(e.target.href)
  }

  return (
    <Form>
      <FormGroup>
        <h5>CORS request testing</h5>
        <p>For example you can try this URL: <a href="https://reqres.in/api/products/3" onClick={onClickLink}>https://reqres.in/api/products/3</a></p>
        <Input className="mb-2" type="text" placeholder="enter URL" value={url} onChange={e => setUrl(e.target.value)}/>
        <Input className="mb-2" type="textarea" placeholder={"Response from server"} value={res} readOnly rows={6}/>
        <Input className="mb-2" type="textarea" placeholder={"Errors from server"} value={error} readOnly rows={6}/>
        <div className='d-flex'>
          <Button className="mr-2" onClick={onClickClearButton}>Clear results</Button>
          <Button onClick={onClickGetRequest}>Send GET Request</Button>
        </div>

      </FormGroup>
    </Form>
  )
}

export default CorsTestForm