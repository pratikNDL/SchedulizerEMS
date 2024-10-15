
type ButtonType = {
    isDisabled?: boolean,
    color?: string
    value: string
    handler: () => void
    addCSS?: string
}

function Button({isDisabled=false, color='red-500', value, handler, addCSS}: ButtonType) {
  return (
    <div className={`${addCSS}`}>
    <button className={`rounded-md bg-${color} py-2 px-4 
        text-sm text-white transition-all 
        hover:bg-${color} hover:shadow-xl 
        disabled:bg-gray-400 disabled:cursor-not-allowed
        ${addCSS}`}

    disabled={isDisabled}
    onClick={handler}>
        {value}
    </button> 
    </div>
  )
}

export default Button