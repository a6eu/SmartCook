import Image from "next/image";
import {useEffect, useState} from "react";
import cookBattle from "../../../../../public/images/cookBattle.png";
import close from "../../../../../public/images/Close.svg";
import search from "../../../../../public/images/Search.png";
import ScrollBlock from "./ScrollBlock";
import axios from "axios";

const SelectOpponent = ({ isModalOpen, onClose, openNext, setOpponent, goBack }) => {
    const [inputValue, setInputValue] = useState("");
    const [users, setUsers] = useState([]);

    const filteredUsers = users.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(inputValue.toLowerCase())
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://web-production-ad96.up.railway.app/api/v1/users/all/');
                setUsers(res.data);
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Selected Opponent:", inputValue);
        openNext();
    };
    if (!isModalOpen) return null;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const handleRandomClick = (e) => {
        e.preventDefault();
        const randomUser = shuffle(users);
        if (filteredUsers.length > 0) {
            setInputValue(`${randomUser[0].first_name} ${randomUser[0].last_name}`);
            console.log(randomUser)
            console.log(inputValue)
        }
    };


    return (
        <div
            className={`overflow-auto fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isModalOpen ? "" : "hidden"}`}
        >
            <div className={'absolute z-50'}>
                <div
                    className={` z-50 w-[500px] h-[512px] bg-white rounded-xl relative flex flex-col items-center mt-5`}
                >
                    <Image src={close} alt="close" width={24} height={24}
                           className="cursor-pointer absolute top-6 right-6" onClick={onClose}/>
                    <Image src={cookBattle} alt="cookBattle" width={80} height={80} className="mt-14"/>
                    <div className="font-bold tracking-[0.1px] mt-5 text-lg">
                        Culinary Clash
                    </div>
                    <div className="mt-2 mb-6">Step 2: Choose your opponent</div>
                    <form className="flex">
                        <div className="flex w-5/6">
                            <input
                                type="text"
                                className="border-2 border-gray-300 pl-3 w-[250px] h-[36px] py-1 rounded-l-3xl"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Find Opponent"
                            />
                            <button
                                className="w-[50px] h-[36px] flex justify-center bg-[#AAE06E] items-center rounded-e-3xl">
                                <Image src={search} className="w-[20px] h-[20px]" alt={'search'}/>
                            </button>
                        </div>

                        <button
                            onClick={(e) => handleRandomClick(e)}
                            className="w-[135px] h-[36px] bg-[#AAE06E] flex justify-center items-center font-bold text-white rounded-3xl self-center hover:bg-green-500">
                            Random
                        </button>
                    </form>
                    <ScrollBlock filteredUsers={filteredUsers} users={users} inputValue={inputValue} setOpponent={setOpponent}/>
                    <div className="flex space-x-5">
                        <button onClick={goBack}
                                className="border-2 border-[#AAE06E] text-[#AAE06E] w-[150px] h-[36px] rounded-full">Back
                        </button>
                        <button onClick={handleSubmit} className="border-2 text-white w-[150px] bg-[#AAE06E] h-[36px] rounded-full">Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectOpponent;
