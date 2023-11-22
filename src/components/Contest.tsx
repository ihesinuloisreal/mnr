import {useEffect, useState} from "react"
import { fetchSingleContests } from "../api-client";
import Header from "./Header";


const Contest = ({initialContest, navigatecontest}) => {
    const [contest, setContests] = useState(initialContest);

    useEffect(() => {
        if (!contest.names) {
            fetchSingleContests(contest.id).then((contest) => {
                setContests(contest);
            });
        }
        
    },[contest.id, contest.names]);

    const HandleClick = (event) => {
        event.preventDefault();
        navigatecontest();
    }
    
    return (
        <>
            <Header message={contest.contestName}/>
            <div className="contest">
                <div className="title">Contest Description</div>
                <div className="description">{contest.description}</div>
                <div className="title">Proposed Name</div>
                <div className="body">
                    {contest.names?.length > 0 ? 
                        (
                        <div className="list">
                            {contest.names.map((proposedName)=>(<div key={proposedName.id} className="item">{proposedName.name}</div>
                            ))}
                        </div>
                        ) 
                        : (<div>No names proposed yet</div>)}
                </div>
                <a href="/" className="link" onClick={HandleClick}>Contest Link</a>
            </div>
        </>
    )
}
export default Contest;