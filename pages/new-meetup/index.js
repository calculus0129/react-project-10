// our-domain.com/new-meetup

import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import NewMeetupForm from '@/components/meetups/NewMeetupForm';

export default function NewMeetupPage() {
    const router = useRouter();

    async function addMeetupHandler(meetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        // router.replace() // make sure that we can't go back with the back button!
        router.push('/');
    }

    return (
        <Fragment>
            <Head>
                <title>New Meetup!</title>
                <meta
                    name='description'
                    content='Add your own meetups and create amazing networking opportunities!'
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
}