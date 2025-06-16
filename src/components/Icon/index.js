import classNames from 'classnames';
import { z } from 'zod';

const IconProps = z.object({
  type: z.string().nonempty('type connot be empty'),
});

function Icon(props) {
  const{type, className , ...rest} = props;
  const iconProps = IconProps.safeParse({type});
  if(!iconProps.success){
    console.error('Props 错误:', iconProps.error);
    return <div>Invalid props</div>;
  }

  return (
      <svg 
          {...rest}
          className={classNames('icon', className)} 
          aria-hidden="true">
          <use xlinkHref={`#${type}`}></use>
      </svg>

  )
}

export default Icon;
