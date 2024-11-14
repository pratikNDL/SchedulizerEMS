
type ButtonType = {
    isDisabled?: boolean,
    value: any
    handler: () => void
    addCSS?: string
    color?: string 
}

function Button({isDisabled=false, value, handler, addCSS, color}: ButtonType) {
  return (
    
    <button className={`rounded-sm py-1 px-5  border-2   font-medium  hover:text-white disabled:cursor-not-allowed 
        border-${color ? color: 'primary-green'} text-${color ? color: 'primary-green'} 
        ${addCSS}`} 
    disabled={isDisabled}
    onClick={handler}>
        {value}
    </button> 

  )
}

export default Button