import * as S from "../../styles/new_styles";

const OptionItem = ({ Options }) => {
  if (!Options) {
    return null;
  }
  return (
    <S.Product_Detail_Option_ItemBox>
      <S.Product_Detail_Option_ItemText>
        {Options.OptionName}
      </S.Product_Detail_Option_ItemText>
      <S.Product_Detail_Option_ButtonBox>
        {Options.OptionValue.map((value, index) => (
          <S.Product_Detail_Option_Button
            className={index === 0 ? "selected" : ""}
          >
            <S.Product_Detail_Option_Button_Span>
              {value}
            </S.Product_Detail_Option_Button_Span>
          </S.Product_Detail_Option_Button>
        ))}
      </S.Product_Detail_Option_ButtonBox>
    </S.Product_Detail_Option_ItemBox>
  );
};

export default OptionItem;
