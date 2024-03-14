import { useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useEffect } from "react";

const OptionItem = ({
  Options,
  seletedOptions,
  setSeletedOptions,
  calcPrice,
}) => {
  const optionRef = useRef([]);
  const [select, setSelect] = useState(Options.OPTION[0]?.OPTION_SID);

  useEffect(() => {
    console.log(select);
    console.log(Options.OPTION[0]?.OPTION_SID);
  }, [select]);

  const findIndexByTitle = (obj, title) => {
    for (const key in obj) {
      if (obj[key].TITLE === title) {
        return parseInt(key);
      }
    }
    return -1; // 찾지 못한 경우
  };

  if (!Options) {
    return null;
  }

  return (
    <S.Product_Detail_Option_ItemBox>
      <S.Product_Detail_Option_ItemText>
        {Options.TITLE}
      </S.Product_Detail_Option_ItemText>
      <S.Product_Detail_Option_ButtonBox>
        {Options?.OPTION?.map((item, index) => (
          <S.Product_Detail_Option_Button
            className={index === 0 ? "selected" : ""}
            ref={(el) => (optionRef.current[index] = el)}
            onClick={(e) => {
              optionRef.current?.map((el, index) => {
                el.classList.remove("selected");
              });
              optionRef.current[index]?.classList.add("selected");
              // setSelect(item.OPTION_SID);
              console.log(seletedOptions);
              console.log(Options.TITLE);
              console.log(findIndexByTitle(seletedOptions, Options.TITLE));
              const copy = seletedOptions;
              const option_index = findIndexByTitle(
                seletedOptions,
                Options.TITLE
              );
              copy[option_index].OPTION_SID = item.OPTION_SID;
              copy[option_index].OPTION_PRICE = item.OPTION_PRICE;
              copy[option_index].OPTION_NM = item.OPTION_NM;
              copy[option_index].OPTION_DETAIL = item.OPTION_DETAIL;

              setSeletedOptions(copy);
              calcPrice();
            }}
          >
            <S.Product_Detail_Option_Button_Span>
              {item.OPTION_NM}
            </S.Product_Detail_Option_Button_Span>
          </S.Product_Detail_Option_Button>
        ))}
      </S.Product_Detail_Option_ButtonBox>
    </S.Product_Detail_Option_ItemBox>
  );
};

export default OptionItem;
