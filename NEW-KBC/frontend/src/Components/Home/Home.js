import React from 'react'
import {
    Container,
    Pera,
    Heading,
    Button,
    // InnerContainer
} from './Home.styles'
import './i.css'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <Container>
            <Heading>KBC Platform</Heading>
            <div className='inner-cont'>
                <Pera>Dive into a World of Endless Trivia Fun</Pera>
                <div id='cont'>
                    <Pera size='2rem'>Join As</Pera>
                    <div id='cont2'>
                        <Link to='/candidate'>
                            <Button>Candidate</Button>
                        </Link>
                        <Pera size='2rem'>-Or-</Pera>
                        <Link to='master'>
                            <Button>Master</Button>
                        </Link>
                        <Pera size='2rem'>-Or-</Pera>
                        <Link to='live'>
                            <Button>Live</Button>
                        </Link>
                    </div >
                </div>
            </div>
        </Container>
    )
}

export default Home
