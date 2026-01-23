import { Fragment, useEffect } from "react";
import { useZTheme } from "../../../stores/useZTheme";
import { Box, IconButton, Stack } from "@mui/material";
import { ImgFromDB } from "../../../components/ImgFromDB";
import { TextRob14Font1Xs } from "../../../components/Text1Xs";
import { TextRob12Font2Xs } from "../../../components/Text2Xs";
import { useTranslation } from "react-i18next";
import { PencilCicleIcon } from "../../../icons/PencilCicleIcon";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useZUserProfile } from "../../../stores/useZUserProfile";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { useBrandMasterResources } from "../../../hooks/useBrandMasterResources";
import moment from "moment";
import { useListUsers } from "../../../hooks/useListUsers";
import { useZColaboratorRegister } from "../../../stores/useZColaboratorRegister";

export const UserTable = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const {
    // setCep,
    // setLocality,
    // setCountryState,
    // setCity,
    // setStreet,
    // setStreetNumber,
    // setCompanyName,
    // setCnpj,
    // setPhone,
    // setSector,
    // setContactEmail,
    // setMSPDomain,
    // mspList,
    setUsers,
    resetAll,
    setIsEditing,
    isEditing,
    // setMspToBeDeleted,
    // mspTableFilter,
    // setModalOpen,
    // setActiveStep,
    // setBrandLogo,
    // setCityCode,
    // setDistrict,
    // setEnterOnEditing,
    // setShowAddressFields,
    // setIsPoc,
    // isPocFilter,
  } = useZColaboratorRegister();

  const { fetchListUsers, userList } = useListUsers();

  const { role } = useZUserProfile();

  useEffect(() => {
    const fetchUsers = async () => {
      await fetchListUsers();
    };

    fetchUsers();
  }, []);

  const startEditing = (index: number) => {
    // setShowAddressFields(true);
    // setIsEditing([index]);
  };

  const saveEdit = () => {
    // setShowAddressFields(false);
    // setIsEditing([]);
    // resetAll();
  };

  const handleEdit = (index: number) => {
    // setEnterOnEditing(true);
    // startEditing(index);
    // setActiveStep(0);
    // const msp = mspList.find((c) => c.idBrandMaster === index);
    // setCompanyName(msp?.brandName || "");
    // setCnpj(msp?.cnpj || "");
    // setPhone(msp?.smsContact || "");
    // setContactEmail(msp?.emailContact || "");
    // setCep(msp?.cep || "");
    // setLocality(msp?.location || "");
    // setCountryState(msp?.state || "");
    // setCity(msp?.city || "");
    // setStreet(msp?.street || "");
    // setStreetNumber(msp?.placeNumber || "");
    // setSector(msp?.setorName || "");
    // setMSPDomain(msp?.domain || "");
    // setBrandLogo({
    //   brandLogoUrl: msp?.brandLogo,
    //   brandObjectName: msp?.brandLogo,
    // });
    // setCityCode(msp?.cityCode ? `${msp.cityCode}` : "");
    // setDistrict(msp?.district || "");
    // setIsPoc(Boolean(msp?.isPoc));
  };

  return (
    <Stack
      sx={{
        width: "100%",
        maxHeight: "540px",
        overflow: "auto",
        gap: "16px",
      }}
    >
      {[...userList].map((user, index) => (
        <Fragment key={`${user.idUser}-${user.username}`}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 4px",
              gap: "16px",
              "@media (max-width: 800px)": {
                flexDirection: "column",
                alignItems: "flex-start",
              },
            }}
          >
            <Box
              sx={{
                flex: "2",
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <ImgFromDB
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "100%",
                }}
                alt="msp image"
                src={
                  user.profileImgUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGHdcalX0wUWxZQCiSv8WzmSPpFGHr4jlsw&s"
                }
              />
              <Stack>
                <TextRob14Font1Xs
                  sx={{
                    color: theme[mode].black,
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {user.username}
                </TextRob14Font1Xs>
                <TextRob12Font2Xs
                  sx={{
                    color: theme[mode].gray,
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  {user.email || ""}
                </TextRob12Font2Xs>
              </Stack>
            </Box>

            {/* Status */}
            <Box
              sx={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                "@media (max-width: 900px)": { display: "none" },
              }}
            >
              <TextRob14Font1Xs
                sx={{
                  color: theme[mode].black,
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                {t("colaboratorRegister.status")}
              </TextRob14Font1Xs>

              {user.lastLoginDate && (
                <TextRob12Font2Xs
                  sx={{
                    color: theme[mode].gray,
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  {t("colaboratorRegister.lastActivity")}{" "}
                  {user.lastLoginDate
                    ? new Date(user.lastLoginDate).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : ""}
                </TextRob12Font2Xs>
              )}
            </Box>
            <Box
              sx={{
                flex: "2",
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                gap: "8px",
                alignItems: "left",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <TextRob14Font1Xs
                  sx={{
                    boxSizing: "content-box",
                    padding: "0 10px",
                    fontWeight: "400",
                    borderRadius: "12px",
                    border: `1px solid ${theme[mode].blueDark}`,
                    color: theme[mode].blueDark,
                    maxWidth: "120px",
                    overflow: "hidden",
                    textWrap: "nowrap",
                    textOverflow: "ellipsis",
                    "&:hover": {
                      cursor: "pointer",
                      background: theme[mode].blueDark,
                      color: theme[mode].mainBackground,
                    },
                  }}
                >
                  {user.role}
                </TextRob14Font1Xs>

                {user.brandMaster?.brandName && (
                  <TextRob14Font1Xs
                    sx={{
                      boxSizing: "content-box",
                      padding: "0 10px",
                      fontWeight: "400",
                      borderRadius: "12px",
                      border: `1px solid ${theme[mode].blueDark}`,
                      color: theme[mode].blueDark,
                      maxWidth: "120px",
                      overflow: "hidden",
                      textWrap: "nowrap",
                      textOverflow: "ellipsis",
                      "&:hover": {
                        cursor: "pointer",
                        background: theme[mode].blueDark,
                        color: theme[mode].mainBackground,
                      },
                    }}
                  >
                    {user.brandMaster?.brandName}
                  </TextRob14Font1Xs>
                )}
              </Box>

              <TextRob14Font1Xs
                sx={{
                  alignSelf: "flex-start",
                  boxSizing: "content-box",
                  padding: "0 10px",
                  fontWeight: "400",
                  borderRadius: "12px",
                  border: `1px solid ${
                    user.isActive ? theme[mode].ok : theme[mode].danger
                  }`,
                  color: user.isActive ? theme[mode].ok : theme[mode].danger,
                }}
              >
                {t(
                  `colaboratorRegister.${user.isActive ? "active" : "inactive"}`,
                )}
              </TextRob14Font1Xs>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                alignItems: "center",
                justifyContent: "flex-start",
                "@media (max-width: 600px)": { display: "none" },
              }}
            >
              {role !== "member" && (
                <IconButton>
                  <PencilCicleIcon fill={theme[mode].blueMedium} />
                </IconButton>
              )}

              {role === "admin" && (
                <IconButton>
                  <DeleteForeverIcon sx={{ color: theme[mode].danger }} />
                </IconButton>
              )}
            </Box>
          </Box>
          {index !== userList.length - 1 && (
            <div
              key={`${user.idUser}-${user.username}-divider`}
              style={{
                height: "1px",
                minHeight: "1px",
                maxHeight: "1px",
                width: "100%",
                background: theme[mode].grayLight,
              }}
            />
          )}
        </Fragment>
      ))}
    </Stack>
  );
};
