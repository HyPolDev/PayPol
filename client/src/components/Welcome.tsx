import { useEffect, useState } from "react"
import { SiEthereum } from "react-icons/si"
import { BsInfoCircle } from "react-icons/bs"
import Input from "./Input"
import LoadingSpinner from "./LoadingSpinner.tsx"
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constant';
import JSConfetti from 'js-confetti'

const Welcome = () => {
    const [currentAccount, setCurrentAccount] = useState<(string[] | undefined)>()
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" })
    const [isLoading, setIsLoading] = useState(false)
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))

    const { ethereum }: any = window;

    const getEthereumContract = () => {
        if (!ethereum) {
            console.warn("Ethereum object is not available, please install MetaMask or another provider.");
            return;
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
        if (!transactionContract) return console.error("Could not find the Smart Contract in the blockchain")

        return transactionContract;
    }

    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return console.warn("Please install any wallet provider like Metamask")

        const accounts = await ethereum.request({ method: "eth_accounts" })

        if (accounts.length) {
            setCurrentAccount(accounts[0]);
        } else {
            console.warn("No accounts found")
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };


    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install a wallet provider")

            const { addressTo, amount, keyword, message } = formData
            const transactionContract = getEthereumContract();

            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex,
                }]
            })

            const transactionHash = await transactionContract?.addToBlockchain(addressTo, parsedAmount, message, keyword)

            setIsLoading(true);
            console.log(`Loading... - ${transactionHash.hash}`)
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`)

            const jsConfetti = new JSConfetti();
            const delay = (ms: number) =>
                new Promise((resolve) => setTimeout(resolve, ms));

            for (let i = 0; i < 6; i++) {
                jsConfetti.addConfetti();
                await delay(200);
            }
            const transactionCount = await transactionContract?.getTransactionCount()

            setTransactionCount(transactionCount.toNumber())
        } catch (error) {
            console.log(error);
            throw new Error()
        }

    }

    const handleChange = (e: any, name: string) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
    }

    const handleSubmit = (e: any) => {
        const { addressTo, amount, keyword, message } = formData
        e.preventDefault()

        if (!addressTo || !amount || !keyword || !message) {
            return console.error("Empty fields")
        }
        sendTransaction()
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white"
    return (
        <div className="flex w-full justify-center">
            <div className="flex mf:flex-row flex-col items-start justify between md:p-20 py-12 px4">
                <div className="flex flex-1 justify-start flex-col mf:mr-24">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">If you have internet <br />You got money</h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base text-gradient">
                        Explore the world. Pay quickly, easily and secure <br /> whenever wherever however you want
                    </p>
                    {!currentAccount &&
                        (<button
                            type="button"
                            onClick={() => connectWallet()}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bf]"
                        >
                            <p className="text-white text-base">
                                Connect Wallet
                            </p>
                        </button>
                        )}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10 text-gradient">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Feature 1
                        </div>
                        <div className={commonStyles}>
                            Feature 2
                        </div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Feature 3
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Feature 4
                        </div>
                        <div className={commonStyles}>
                            Feature 5
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles} text-center`}>
                            {`>1 transactions to date`}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-gassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" style={{ transform: "rotate(30deg)" }} />
                                </div>
                                <BsInfoCircle fontSize={17} color={"#fff"} />
                            </div>
                            <div>
                                <p className="text-white font-light text-sm text-gradient">
                                    0xFJIRN......CVWAUS temporal
                                </p>
                                <p className="text-white font-semibold text-lg mt-1 text-gradient">
                                    Ethereum (temporal)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:w-107 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder={"Adress To"} name={"addressTo"} type="text" handleChange={handleChange} />
                        <Input placeholder={"Аmount (Eth)"} name={"amount"} type="number" handleChange={handleChange} />
                        <Input placeholder={"Keyword"} name={"keyword"} type="text" handleChange={handleChange} />
                        <Input placeholder={"Memo"} name={"message"} type="text" handleChange={handleChange} />

                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#2546bf] rounded-full cursor-pointer transition duration-300 ease-in-out" >
                                Send now
                            </button>
                        )}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Welcome