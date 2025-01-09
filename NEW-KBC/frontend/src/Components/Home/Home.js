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
import { ROUTES } from '../../Constants/routes'

function Home() {
    return (
        <Container>
            <Heading>KBC Platform</Heading>
            <div className='inner-cont'>
                <Pera>Dive into a World of Endless Trivia Fun</Pera>
                <div id='cont'>
                    <Pera size='2rem'>Join As</Pera>
                    <div id='cont2'>
                        <Link to={ROUTES.CANDIDATE}>
                            <Button>Candidate</Button>
                        </Link>
                        <Pera size='2rem'>-Or-</Pera>
                        <Link to={ROUTES.MASTER}>
                            <Button>Master</Button>
                        </Link>
                        <Pera size='2rem'>-Or-</Pera>
                        <Link to={ROUTES.LIVE}>
                            <Button>Live</Button>
                        </Link>
                        <Pera size='2rem'>-Or-</Pera>
                        <Link to={ROUTES.FINALEHOST}>
                            <Button>Finale Host</Button>
                        </Link>
                        <Pera size='2rem'>-Or-</Pera>
                        <Link to={ROUTES.FINALECANDIDATE}>
                            <Button>Finale Candidate</Button>
                        </Link>
                    </div >
                </div>
            </div>
        </Container>
    )
}

export default Home
