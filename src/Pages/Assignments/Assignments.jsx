import AssignmentCard from "./AssignmentCard";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";




const Assignments = () => {
    const { user } = useContext(AuthContext);

    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        fetch('https://studynest-server.vercel.app/assignments')
            .then(res => res.json())
            .then(data => setAssignments(data))
    }, [])
    // const allAssignments = useLoaderData();
    // const [currentPage, setCurrentPage] = useState(0);
    // const [count, setCount] = useState({});
    // const [itemPerPage, SetItemPerPage] = useState(10);
    // const numsOfPage = Math.ceil(count / itemPerPage);
    // const pages = [];
    // for(let i =0; i< numsOfPage; i++){
    //     pages.push(i);
    // }
    // console.log(pages);
    // useEffect(()=>{
    //     fetch('https://studynest-server.vercel.app/assignmentsCount')
    //     .then(res=>res.json())
    //     .then(data=>setCount(data.count))
    // },[])
    // const handleItemPerPage = e=>{
    //     const val = parseInt(e.target.value);
    //     SetItemPerPage(val);
    //     setCurrentPage(0);
    // }
    // const handlePrevPage = ()=>{
    //     if(currentPage >0){
    //         setCurrentPage(currentPage -1);
    //     }
    // }
    // const handleNextPage = ()=>{
    //     if(currentPage < pages.length -1){
    //         setCurrentPage(currentPage +1);
    //     }
    // }
    const handleDifficultyLevel = (e) => {
        e.preventDefault();
        let arr = [];
        let value = e.target.value;

        assignments.filter((singleAssign) => {
            if (singleAssign.dLevel == value) {
                arr.push(singleAssign);
                return arr;
            }
            setAssignments(arr);
        })


    }
    const handleDelete = (id) => {
        console.log(id)
        fetch(`https://studynest-server.vercel.app/delete-assignment/${id}?email=${user?.email}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    toast.error('You Are Not Able to Delete')
                }
                else {

                    // remove the user from the UI

                    const remainingUsers = assignments && assignments.filter(item => (item._id !== id));
                    setAssignments(remainingUsers);
                    toast.success('Deleted Successfully');

                }



            })
    }
    return (
        <div className="py-28 px-5">
            <div>
                <label className="input-group">
                    <select className="form-select border" aria-label="Default select example" onChange={handleDifficultyLevel}>
                        <option selected>By Difficulty Level</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </label>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
                    {
                        assignments.map(assignment => <AssignmentCard key={assignment._id} assignment={assignment} handleDelete={handleDelete}></AssignmentCard>)
                    }
                </div>
                <Toaster />
            </div>
            {/* <div>
                <button className="btn" onClick={handlePrevPage}>Prev</button>
                {
                    pages.map(page=><button className={`btn ${currentPage === page && "bg-[#164863] btn text-white"}`} onClick={()=>setCurrentPage(page)} key={page}>{page}</button>)
                }
                <button className="btn" onClick={handleNextPage}>Next</button>
                <select value={itemPerPage} onChange={handleItemPerPage} name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div> */}
        </div>
    );
};

export default Assignments;










