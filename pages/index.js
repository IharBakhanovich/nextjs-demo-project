// our-domain.com/new-meetup
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import { Fragment, useEffect, useState } from "react";
import { MongoClient } from "mongodb";
// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     titile: "A firts meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/320px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5, 12345 Some City",
//     description: "this is a first meetup",
//   },
//   {
//     id: "m2",
//     titile: "A second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/320px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 10, 12345 Some City",
//     description: "this is a second meetup",
//   },
// ];
const HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //   //send a http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title> React Meetups </title>
        <meta
          name="description"
          content="Brouse a huge list of highly active React meetups"
        >
        </meta>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://iharbakhanovich:1RMHjZTNRQ9hoqO3@cluster0.llzeyal.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  console.log("Fetched meetups are: " + meetups);
  client.close();

  // read data from some file in a file system
  return {
    // configure some stuff, but we must set a 'props' here
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })), // and now we no longer needs of useEffect and useState in the component
    }, // the objekt, which we receive in the componen (here HomePage)
    revalidate: 10, // the data is updated every 10 seconds if there are requests to this page
    // BUT what if we want pregenerate this page dinamicly for every single request on the fly after deploying on a server
  };
}

// to pregenerate this page dinamicly for every single request on the fly after the project was deployed on a server
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // this code will always run on a server and never on a client and for ever incoming request
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// };

export default HomePage;
