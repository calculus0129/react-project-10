import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";

export async function getStaticPaths() {
    const client = await MongoClient.connect(`mongodb+srv://ryanbhang129:${process.env.API_KEY}@cluster0.2eujcff.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0`);
    const db = client.db(); // Read, created if not existing

    const meetupsCollection = db.collection('meetups');
    // 1st arg: filter of objects to get, 2nd arg: which
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
    }
}

export async function getStaticProps({ params }) {
    // fetch data for a single meetup
    const client = await MongoClient.connect(`mongodb+srv://ryanbhang129:${process.env.API_KEY}@cluster0.2eujcff.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0`);
    const db = client.db(); // Read, created if not existing

    const meetupsCollection = db.collection('meetups');
    // 1st arg: filter of objects to get, 2nd arg: which
    const meetup = await meetupsCollection.findOne({
        _id: new ObjectId(params.meetupId)
    });

    client.close();

    return {
        props: {
            meetupData: {
                id: meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
            }
        }
    };
}

export default function MeetupDetails(props) {
    const meetupDatum = props.meetupData;
    return (
        <Fragment>
            <Head>
                <title>{meetupDatum.title}</title>
                <meta name="description" content={props.meetupData.description}/>
            </Head>
            <MeetupDetail
                image={meetupDatum.image}
                title={meetupDatum.title}
                address={meetupDatum.address}
                description={meetupDatum.description}
            />
        </Fragment>
    );
}
