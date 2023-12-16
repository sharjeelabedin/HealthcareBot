import './ImageTag.css';
import { Space, Tag } from 'antd';

type Props = {
  svgicon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  textColour: string;
  fillColour: string;
  borderColour: string;
  text: string;
}

const IconTag = ({ svgicon: Icon, textColour, fillColour, borderColour, text }: Props) => {
  const tagStyle = {
    borderColor: borderColour,
    display: 'flex',
    alignItems: 'center',
    borderWidth: '2px', 
    borderRadius: '8px', 
   
  
  };
  const tagTextStyle = {
    color: textColour,
  }

  return (
    <div className='icon-component-container'>
      <Space size={[0, 8]} wrap>
        <Tag icon={<Icon className="svg" />} color={fillColour} className="tag-with-icon" style={tagStyle}>
          <span className="tag-text" style={tagTextStyle}>{text}</span>
        </Tag>
      </Space>
    </div>
  );
};

export default IconTag;
