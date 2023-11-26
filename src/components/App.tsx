import {useState, useEffect} from "react";
import ContestList from "./ContestList";
import Contest from "./Contest";
import { addNewContest, deleteSingleContests } from "../api-client";

const App = ({initialData}) => {
    // console.log(initialData);
    const [page, setPage] = useState<"contestList"| "contest">(initialData.currentContest ? "contest":"contestList");
    const [currentContest, setcurrentContest] = useState<object| undefined>(initialData.currentContest);
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
      window.onpopstate = (event) => {
        const newPage = event.state?.contestId ? "contest":"contestList";
        setPage(newPage);
        setcurrentContest({id: event.state?.contestId})
      }
    }, [])
    

    const navigateToContest = (contestId) => {
        window.history.pushState({contestId},"", `/contest/${contestId}`)
        setPage("contest");
        setcurrentContest({id: contestId})
    }

    const navigateToContestList = () => {
        window.history.pushState({},"", "/");
        setPage("contestList");
        setcurrentContest(undefined);
    }
    const deleteContest = (contestId) => {
        deleteSingleContests(contestId);
                        
    }

    const pageContent = () => {
        switch (page) {
            case "contestList":
                return(
                    <>
                    <ContestList initialContest={initialData.contests} onContestClick= {navigateToContest} deleteContest= {deleteContest}/>;

                        {
                visibility ? (
                    <div className="body">
                    <form onSubmit={handleNewContestSubmit}>
                        <input type="text" name="name" placeholder="Contest Name Here..." />
                        <input type="text" name="category" placeholder="Contest Category Here..." />
                        <input type="text" name="description" placeholder="Contest Description Here..." />
                        <button type="submit">Submit</button>
                    </form>
                </div> 
                ) 
                : 
                <button onClick={()=>{setVisibility(true)}}>Add New Contest</button>
            }
                    </>)
            case "contest":
                return <Contest initialContest={currentContest} navigatecontest={navigateToContestList}/>;
        }
    }
    
    const handleNewContestSubmit = async (event) => {
        event.preventDefault();
        const contestName = event.target.name;
        const contestCategory = event.target.category;
        const contestDescription = event.target.description;

        const updatedContest = await addNewContest({
            contestName: contestName.value,
            contestCategory: contestCategory.value,
            contestDescription: contestDescription.value
        });
        console.log(updatedContest);
        // (updatedContest);
    }

    return(
        <div className="container">
           {pageContent()}
           
        </div>
    );
};
export default App;