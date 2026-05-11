import { useParams } from "react-router-dom";

const ShowMessages = () => {
  const { channelId } = useParams();
  const { serverId } = useParams();

  return <div></div>;
};

export default ShowMessages;
