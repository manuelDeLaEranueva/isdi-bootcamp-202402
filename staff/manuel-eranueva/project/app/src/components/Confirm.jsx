import RoundButton from './library/RoundButton'
import CancelButton from './library/CancelButton'

function Confirm({ message, onAcceptClick, onCancelClick }) {
    return (
        <div className="fixed top-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg">
                <h3 className="text-lg mb-6">{message}</h3>
                <div className="flex gap-4 mt-6">
                    <button onClick={onAcceptClick} className="bg-[#000568] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-4">
                        Accept
                    </button>
                    <button onClick={onCancelClick} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Confirm
