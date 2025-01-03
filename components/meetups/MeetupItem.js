import { useRouter } from 'next/router';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
// import Image from 'next/image';

function MeetupItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    router.push(`/${props.id}`); // equivalent of using the link component
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
          {/* <Image
            key={props.key}
            src={props.image}
            alt={props.title}
            width='100%'
            height='100%'/> */}
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
