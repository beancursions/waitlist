import { InfoNote } from "./NoteBox";
import { useApi } from "../api";
import { formatDatetime } from "../Util/time";
import styled from "styled-components";
import { Markdown } from "./Markdown";
import { Content } from "./Page";

const AnnounceHeader = styled.div`
  margin-bottom: 0.5em;
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.colors.accent3};
`;

const AnnouncementMessage = styled(Content)`
  p {
    margin-bottom: 0em;
  }
  h1,
  h2,
  h3,
  h4 {
    margin-top: 0em;
  }
`;

export function InfoAnnouncement({ id }) {
  const [announcement] = useApi(`/api/announcement/read?id=${id}`);
  if (announcement === null) {
    return null;
  }
  if (announcement.message === "") {
    return null;
  }
  return (
    <AnnouncementMessage>
      <InfoNote
        variant={announcement.message.slice(0, 6) === "DANGER" ? "danger" : "secondary"}
        width={"100%"}
      >
        <div style={{ width: "100%" }}>
          <AnnounceHeader style={{ marginBottom: "0.5em" }}>
            {" "}
            <b>ANNOUNCEMENT&nbsp;</b>
            {formatDatetime(new Date(announcement.created_at * 1000))} by {announcement.created_by}{" "}
          </AnnounceHeader>
          <Markdown>{announcement.message}</Markdown>
        </div>
      </InfoNote>
    </AnnouncementMessage>
  );
}
