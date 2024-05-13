import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { BorderAll } from "@mui/icons-material";

const OptionToggle = ({ type, selOption, setSelOption, updateOptionAmt }) => {
  /**
   * 귀도리
   */
  const [earDori, setEarDori] = useState(false);
  const [earDoriOption, setEarDoriOption] = useState("4mm");
  //좌상 우상 좌하 우하
  const [checked, setChecked] = useState([true, true, true, true]);

  const handleChangeEarDori = (event, newAlignment) => {
    console.log(event);
    setEarDori(newAlignment);
  };

  const handleChangeOption = (event, newAlignment) => {
    setEarDoriOption(newAlignment);
  };

  const handleChange1 = (event) => {
    setChecked([
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1], checked[2], checked[3]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked, checked[2], checked[3]]);
  };
  const handleChange4 = (event) => {
    setChecked([checked[0], checked[1], event.target.checked, checked[3]]);
  };

  const handleChange5 = (event) => {
    setChecked([checked[0], checked[1], checked[2], event.target.checked]);
  };
  /**
   * 타공
   */

  const [punching, setPunching] = useState(false);
  const [punchingQty, setPunchingQty] = useState("cnt1");
  const [punchingSize, setPunchingSize] = useState("3mm");

  const handleChangePerfo = (event, newAlignment) => {
    setPunching(newAlignment);
  };

  /**
   * 오시 명함
   */

  const [osi, setOsi] = useState(false);
  const [osiQty, setOsiQty] = useState("line1");
  const [osiDirect, setOsiDirect] = useState("가로");

  const handleChangeOsi = (event, newAlignment) => {
    setOsi(newAlignment);
  };

  /**
   * 미싱
   */

  const [missing, setMissing] = useState(false);
  const [missingQty, setMissingQty] = useState("line1");
  const [missingDirect, setMissingDirect] = useState("가로");

  const handleChangeMissing = (event, newAlignment) => {
    setMissing(newAlignment);
  };

  /**
   * 코팅
   */

  const [cotting, setCotting] = useState(false);
  const [cottingOption, setCottingOption] = useState("dan_yes");

  const handleChangeCotting = (event, newAlignment) => {
    setCotting(newAlignment);
  };

  /**
   * 책자 종합
   */

  // 표지 페이지
  const [coverPage, setCoverPage] = useState("4p");
  // 규격
  const [paperSize, setPaperSize] = useState("A4");
  // 내지
  const [innerPaper, setInnerPaper] = useState("스노우 100g");
  // 내지 컬러
  const [innerColor, setInnerColor] = useState("양면8도컬러");
  // 내지 페이지수
  const [innerPage, setInnerPage] = useState(20);
  // 제본
  const [bindingType, setBindingType] = useState("중철");

  /**
   * 옵션 토탈
   *
   */
  useEffect(() => {
    const copy = selOption;

    copy.earDori = earDori;
    copy.earDoriOption = earDoriOption;

    setSelOption(copy);
    updateOptionAmt();
  }, [earDori, earDoriOption]);

  useEffect(() => {
    const copy = selOption;
    copy.punching = punching;
    copy.punchingQty = punchingQty;
    copy.punchingSize = punchingSize;

    setSelOption(copy);
    updateOptionAmt();
  }, [punching, punchingQty, punchingSize]);

  useEffect(() => {
    const copy = selOption;
    console.log(copy);

    copy.osi = osi;
    copy.osiQty = osiQty;
    copy.osiDirect = osiDirect;

    setSelOption(copy);

    updateOptionAmt();
  }, [osi, osiQty, osiDirect]);

  useEffect(() => {
    const copy = selOption;
    console.log(copy);

    copy.missing = missing;
    copy.missingQty = missingQty;
    copy.missingDirect = missingDirect;

    setSelOption(copy);

    updateOptionAmt();
  }, [missing, missingQty, missingDirect]);

  useEffect(() => {
    const copy = selOption;
    console.log(copy);

    copy.cotting = cotting;
    copy.cottingOption = cottingOption;

    setSelOption(copy);

    updateOptionAmt();
  }, [cotting, cottingOption]);

  useEffect(() => {
    const copy = selOption;
    console.log(copy);

    copy.coverPage = coverPage;
    copy.paperSize = paperSize;
    copy.innerPaper = innerPaper;
    copy.innerColor = innerColor;
    copy.innerPage = innerPage;
    copy.bindingType = bindingType;

    setSelOption(copy);

    updateOptionAmt();
  }, [coverPage, paperSize, innerPaper, innerColor, innerPage, bindingType]);

  return (
    <>
      {type === "귀도리" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <S.Product_Detail_Option_ItemBox>
            <S.Product_Detail_Option_ItemText>
              귀도리
            </S.Product_Detail_Option_ItemText>
            <S.OptionBtns2>
              <ToggleButtonGroup
                color="primary"
                value={earDori}
                exclusive
                onChange={handleChangeEarDori}
                aria-label="Platform"
                style={{ width: "100%" }}
                className="group"
              >
                <ToggleButton value={true}>둥근 모서리</ToggleButton>
                <ToggleButton value={false}>직각 모서리</ToggleButton>
              </ToggleButtonGroup>
            </S.OptionBtns2>
          </S.Product_Detail_Option_ItemBox>

          {earDori && (
            <S.Product_Detail_Option_ItemBox>
              {/* <S.Product_Detail_Option_ItemText>
                귀도리 상세
              </S.Product_Detail_Option_ItemText> */}
              <S.OptionBtns2>
                <ToggleButtonGroup
                  color="primary"
                  value={earDoriOption}
                  exclusive
                  onChange={handleChangeOption}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"4mm"}>4mm</ToggleButton>
                  <ToggleButton value={"6mm"}>6mm</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns2>

              {earDoriOption === "show" && (
                <S.CheckBoxWrapper>
                  <FormControlLabel
                    label="전체"
                    control={
                      <Checkbox
                        checked={checked[0] && checked[1]}
                        indeterminate={checked[0] !== checked[1]}
                        onChange={handleChange1}
                      />
                    }
                  />
                  <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                    <FormControlLabel
                      label="좌상"
                      control={
                        <Checkbox
                          checked={checked[0]}
                          onChange={handleChange2}
                        />
                      }
                    />
                    <FormControlLabel
                      label="우상"
                      control={
                        <Checkbox
                          checked={checked[1]}
                          onChange={handleChange3}
                        />
                      }
                    />
                    <FormControlLabel
                      label="좌하"
                      control={
                        <Checkbox
                          checked={checked[2]}
                          onChange={handleChange4}
                        />
                      }
                    />
                    <FormControlLabel
                      label="우하"
                      control={
                        <Checkbox
                          checked={checked[3]}
                          onChange={handleChange5}
                        />
                      }
                    />
                  </Box>
                </S.CheckBoxWrapper>
              )}
            </S.Product_Detail_Option_ItemBox>
          )}
        </Box>
      )}
      {type === "타공" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <S.Product_Detail_Option_ItemBox>
            <S.Product_Detail_Option_ItemText>
              타공
            </S.Product_Detail_Option_ItemText>
            <S.OptionBtns2>
              <ToggleButtonGroup
                color="primary"
                value={punching}
                exclusive
                onChange={handleChangePerfo}
                aria-label="Platform"
                style={{ width: "100%" }}
                className="group"
              >
                <ToggleButton value={true}>타공</ToggleButton>
                <ToggleButton value={false}>선택 안함</ToggleButton>
              </ToggleButtonGroup>
            </S.OptionBtns2>
          </S.Product_Detail_Option_ItemBox>

          {punching && (
            <>
              <S.Product_Detail_Option_ItemBox>
                {/* <S.Product_Detail_Option_ItemText>
                  타공 상세
                </S.Product_Detail_Option_ItemText> */}
                <S.OptionBtns3>
                  <ToggleButtonGroup
                    color="primary"
                    value={punchingQty}
                    exclusive
                    onChange={(e) => {
                      setPunchingQty(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"cnt1"}>1개</ToggleButton>
                    <ToggleButton value={"cnt2"}>2개</ToggleButton>
                    <ToggleButton value={"cnt3"}>3개</ToggleButton>
                    <ToggleButton value={"cnt4"}>4개</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns3>
              </S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemBox>
                <S.OptionBtns2>
                  <ToggleButtonGroup
                    color="primary"
                    value={punchingSize}
                    exclusive
                    onChange={(e) => {
                      setPunchingSize(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"3mm"}>3mm</ToggleButton>
                    <ToggleButton value={"4mm"}>4mm</ToggleButton>
                    <ToggleButton value={"5mm"}>5mm</ToggleButton>
                    <ToggleButton value={"6mm"}>6mm</ToggleButton>
                    <ToggleButton value={"7mm"}>7mm</ToggleButton>
                    <ToggleButton value={"8mm"}>8mm</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns2>
              </S.Product_Detail_Option_ItemBox>
            </>
          )}
        </Box>
      )}
      {type === "오시" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <S.Product_Detail_Option_ItemBox>
            <S.Product_Detail_Option_ItemText>
              오시
            </S.Product_Detail_Option_ItemText>
            <S.OptionBtns2>
              <ToggleButtonGroup
                color="primary"
                value={osi}
                exclusive
                onChange={handleChangeOsi}
                aria-label="Platform"
                style={{ width: "100%" }}
                className="group"
              >
                <ToggleButton value={true}>오시</ToggleButton>
                <ToggleButton value={false}>선택 안함</ToggleButton>
              </ToggleButtonGroup>
            </S.OptionBtns2>
          </S.Product_Detail_Option_ItemBox>

          {osi && (
            <Box sx={{}}>
              <S.Product_Detail_Option_ItemBox>
                {/* <S.Product_Detail_Option_ItemText>
                  오시 상세
                </S.Product_Detail_Option_ItemText> */}
                <S.OptionBtns3>
                  <ToggleButtonGroup
                    color="primary"
                    value={osiQty}
                    exclusive
                    onChange={(e) => {
                      setOsiQty(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"line1"}>1줄</ToggleButton>
                    <ToggleButton value={"line2"}>2줄</ToggleButton>
                    <ToggleButton value={"line3"}>3줄</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns3>
              </S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemBox>
                <S.OptionBtns2>
                  <ToggleButtonGroup
                    color="primary"
                    value={osiDirect}
                    exclusive
                    onChange={(e) => {
                      setOsiDirect(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"가로"}>가로</ToggleButton>
                    <ToggleButton value={"세로"}>세로</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns2>
              </S.Product_Detail_Option_ItemBox>
            </Box>
          )}
        </Box>
      )}
      {type === "미싱" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <S.Product_Detail_Option_ItemBox>
            <S.Product_Detail_Option_ItemText>
              미싱
            </S.Product_Detail_Option_ItemText>
            <S.OptionBtns2>
              <ToggleButtonGroup
                color="primary"
                value={missing}
                exclusive
                onChange={handleChangeMissing}
                aria-label="Platform"
                style={{ width: "100%" }}
                className="group"
              >
                <ToggleButton value={true}>미싱</ToggleButton>
                <ToggleButton value={false}>선택 안함</ToggleButton>
              </ToggleButtonGroup>
            </S.OptionBtns2>
          </S.Product_Detail_Option_ItemBox>

          {missing && (
            <Box sx={{}}>
              <S.Product_Detail_Option_ItemBox>
                {/* <S.Product_Detail_Option_ItemText>
                  미싱 상세
                </S.Product_Detail_Option_ItemText> */}
                <S.OptionBtns3>
                  <ToggleButtonGroup
                    color="primary"
                    value={missingQty}
                    exclusive
                    onChange={(e) => {
                      setMissingQty(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"line1"}>1줄</ToggleButton>
                    <ToggleButton value={"line2"}>2줄</ToggleButton>
                    <ToggleButton value={"line3"}>3줄</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns3>
              </S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemBox>
                <S.OptionBtns2>
                  <ToggleButtonGroup
                    color="primary"
                    value={missingDirect}
                    exclusive
                    onChange={(e) => {
                      setMissingDirect(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"가로"}>가로</ToggleButton>
                    <ToggleButton value={"세로"}>세로</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns2>
              </S.Product_Detail_Option_ItemBox>
            </Box>
          )}
        </Box>
      )}
      {type === "코팅" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <S.Product_Detail_Option_ItemBox>
            <S.Product_Detail_Option_ItemText>
              코팅
            </S.Product_Detail_Option_ItemText>
            <S.OptionBtns2>
              <ToggleButtonGroup
                color="primary"
                value={cotting}
                exclusive
                onChange={handleChangeCotting}
                aria-label="Platform"
                style={{ width: "100%" }}
                className="group"
              >
                <ToggleButton value={true}>코팅</ToggleButton>
                <ToggleButton value={false}>선택 안함</ToggleButton>
              </ToggleButtonGroup>
            </S.OptionBtns2>
          </S.Product_Detail_Option_ItemBox>

          {cotting && (
            <Box sx={{}}>
              <S.Product_Detail_Option_ItemBox>
                {/* <S.Product_Detail_Option_ItemText>
                  코팅 상세
                </S.Product_Detail_Option_ItemText> */}
                <S.OptionBtns>
                  <ToggleButtonGroup
                    color="primary"
                    value={cottingOption}
                    exclusive
                    onChange={(e) => {
                      setCottingOption(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"dan_yes"}>단면유광코팅</ToggleButton>
                    <ToggleButton value={"dan_no"}>단면무광코팅</ToggleButton>
                    <ToggleButton value={"yang_yes"}>양면유광코팅</ToggleButton>
                    <ToggleButton value={"yang_no"}>양면무광코팅</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns>
              </S.Product_Detail_Option_ItemBox>
            </Box>
          )}
        </Box>
      )}
      {type === "표지코팅" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <S.Product_Detail_Option_ItemBox>
            <S.Product_Detail_Option_ItemText>
              표지코팅
            </S.Product_Detail_Option_ItemText>
            <S.OptionBtns2>
              <ToggleButtonGroup
                color="primary"
                value={cotting}
                exclusive
                onChange={handleChangeCotting}
                aria-label="Platform"
                style={{ width: "100%" }}
                className="group"
              >
                <ToggleButton value={true}>코팅</ToggleButton>
                <ToggleButton value={false}>선택 안함</ToggleButton>
              </ToggleButtonGroup>
            </S.OptionBtns2>
          </S.Product_Detail_Option_ItemBox>

          {cotting && (
            <Box sx={{}}>
              <S.Product_Detail_Option_ItemBox>
                {/* <S.Product_Detail_Option_ItemText>
                  코팅 상세
                </S.Product_Detail_Option_ItemText> */}
                <S.OptionBtns>
                  <ToggleButtonGroup
                    color="primary"
                    value={cottingOption}
                    exclusive
                    onChange={(e) => {
                      setCottingOption(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"dan_yes"}>단면유광코팅</ToggleButton>
                    <ToggleButton value={"dan_no"}>단면무광코팅</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns>
              </S.Product_Detail_Option_ItemBox>
            </Box>
          )}
        </Box>
      )}
      {type === "책자" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={coverPage}
                  exclusive
                  onChange={(e) => {
                    setCoverPage(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"4p"}>4페이지 양면</ToggleButton>
                  <ToggleButton value={"2p"}>2페이지 단면</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                규격
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns3>
                <ToggleButtonGroup
                  color="primary"
                  value={paperSize}
                  exclusive
                  onChange={(e) => {
                    setPaperSize(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"A4"}>A4</ToggleButton>
                  <ToggleButton value={"A5"}>A5</ToggleButton>
                  <ToggleButton value={"B5"}>B5</ToggleButton>
                  <ToggleButton value={"B6"}>B6</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns3>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                내지
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={innerPaper}
                  exclusive
                  onChange={(e) => {
                    setInnerPaper(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"스노우 100g"}>스노우 100g</ToggleButton>
                  <ToggleButton value={"아트지 100g"}>아트지 100g</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={innerColor}
                  exclusive
                  onChange={(e) => {
                    setInnerColor(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"양면8도컬러"}>양면8도컬러</ToggleButton>
                  <ToggleButton value={"단면4도컬러"}>단면4도컬러</ToggleButton>
                  <ToggleButton value={"양면먹2도"}>양면먹2도</ToggleButton>
                  <ToggleButton value={"단면먹1도"}>단면먹1도</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <TextField
                  sx={{ width: "50%", marginTop: "5px" }}
                  id="outlined-basic"
                  label="페이지수"
                  value={innerPage}
                  variant="outlined"
                  size="small"
                  type="number"
                  onChange={(e) => {
                    setInnerPage(e.target.value);
                  }}
                />
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                제본
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns2>
                <ToggleButtonGroup
                  color="primary"
                  value={bindingType}
                  exclusive
                  onChange={(e) => {
                    setBindingType(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"중철"}>중철</ToggleButton>
                  <ToggleButton value={"무선"}>무선</ToggleButton>
                  <ToggleButton value={"스프링"}>스프링</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns2>
            </S.Product_Detail_Option_ItemBox>
          </Box>
        </Box>
      )}
    </>
  );
};

export default OptionToggle;
