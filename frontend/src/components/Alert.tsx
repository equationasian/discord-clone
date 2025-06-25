interface AlertProps {
    isError: boolean;
    message: string;
};

export default function Alert({ isError, message }: AlertProps) {
    return (
        <div className={`absolute rounded-lg p-4 top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white ${isError ? 'bg-red-500' : 'bg-green-500'} transition-transform duration-300 ease-in -translate-y-8 `}>
            {message}
        </div>
    );
}