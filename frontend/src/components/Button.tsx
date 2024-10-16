
type ButtonType = {
    isDisabled?: boolean,
    value: any
    handler: () => void
    addCSS?: string
}

function Button({isDisabled=false, value, handler, addCSS}: ButtonType) {
  return (
    
    <button className={`rounded-md py-2 px-2 mb-2  font-bold
        text-sm text-white 
        transition-shadow hover:shadow-xl w-fit
      disabled:bg-gray-400 disabled:cursor-not-allowed
        ${addCSS}`}

    disabled={isDisabled}
    onClick={handler}>
        {value}
    </button> 

  )
}

export default Button