// import Layout from '@/components/layout/Layout';
import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from 'mongodb';
import Head from "next/head";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fpublic.notion-static.com%2Fb285f219-56df-4413-9e46-c23e301bd882%2FQkXpiyo8ZrRBp3VTzT9IhiJMsgw_Ln6BajXZLdEMj2YsY_hO4XO_2lDUgA2ya0tnCsZxJ6RQZFlWYTP_H4teTw.gif?userId=29cf4ce4-bc40-404c-87a1-60c9aaf05eb6&cache=v2',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a first meetup!'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://avatars.githubusercontent.com/u/30453652?v=4',
//         address: 'Some address 10, 12345 Some City',
//         description: 'This is a second meetup!'
//     },
// ];

// export async function getServerSideProps(content) {
//     const {req, res} = content;
//     // fetch Data from an API.
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     };
// }

// // server side.
export async function getStaticProps() {
    // fetch data from an API

    // credential, private code => not run on the client side!
    const client = await MongoClient.connect(`mongodb+srv://ryanbhang129:${process.env.API_KEY}@cluster0.2eujcff.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0`);
    const db = client.db(); // Read, created if not existing

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 1
    };
}

export default function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name='description'
                    content='Browse a huge list of meetups with React!'
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}