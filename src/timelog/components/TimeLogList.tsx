import { HiOutlineTrash } from "react-icons/hi";
//create time entry object
interface Entry {
  id: number;
  title: string;
  description: string;
  hours: number;
  minutes: number;
}
//create props interface
interface Props {
  entries: Entry[];
  onDelete: (id: number) => void;
}
const TimeLogList = ({ entries, onDelete }: Props) => {
  if (entries.length === 0) return null;
  return (
    <div className="card">
      <div className="card-header">Today</div>
      <ul className="list-group list-group-flush">
        {entries.map((entry) => (
          <li className="list-group-item " key={entry.id}>
            <div className="entry-content">
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.description}</p>
              </div>

              <div>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="btn btn-outline-dark"
                >
                  <HiOutlineTrash />
                </button>
                <p>
                  {entry.hours === 0 ? "" : entry.hours + "h"}{" "}
                  {entry.minutes === 0 ? "" : entry.minutes + "m"}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeLogList;
