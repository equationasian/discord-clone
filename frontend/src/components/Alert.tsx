import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

interface AlertProps {
    isError: boolean;
    message: string;
};

export default function Alert({ isError, message }: AlertProps) {
    return (
        <div className={`absolute flex justify-center gap-2 items-center rounded-md p-3 top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-100 ${isError ? 'bg-red-700' : 'bg-green-700'} transition-transform duration-300 ease-in-out -translate-y-8 `}>
            <div>
                { isError ? <ClearIcon className='text-red-100' /> : <CheckIcon className='text-green-100' /> }
            </div>
            <span className={`${isError ? 'text-red-100': 'text-green-100'}`}>{message}</span>
        </div>
    );
}