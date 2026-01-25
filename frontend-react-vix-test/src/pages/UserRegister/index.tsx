import { Box, Modal, Stack } from "@mui/material";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../components/Text1S";
import { UserTableFilters } from "./UserTable/UserTableFilter";
import { UserTable } from "./UserTable/UserTable";
import { ModalDeleteUser } from "./ModalDeleteUser";
import { AbsoluteBackDrop } from "../../components/AbsoluteBackDrop";
import { useZColaboratorRegister } from "../../stores/useZColaboratorRegister";
import { useUserResources } from "../../hooks/useUserResources";

export const UserRegisterPage = () => {
  const { theme, mode } = useZTheme();

  const { setModalOpen, modalOpen, setUserToBeDeleted, userToBeDeleted } =
    useZColaboratorRegister();

  const { t } = useTranslation();
  const { isLoading } = useUserResources();

  return (
    <ScreenFullPage
      title={
        <TextRob20Font1MB
          sx={{
            color: theme[mode].primary,
            fontSize: "28px",
            fontWeight: "500",
            lineHeight: "40px",
          }}
        >
          {t("colaboratorRegister.title")} |{" "}
          {t("colaboratorRegister.sideTitle")}
        </TextRob20Font1MB>
      }
      sxTitleSubTitle={{
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
      sxContainer={{
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
      }}
      subtitle={
        <Box
          sx={{
            maxWidth: "646px",
            "@media (max-width: 660px)": { maxWidth: "136px" },
          }}
        >
          <TextRob16Font1S
            sx={{
              color: theme[mode].tertiary,
              fontWeight: "500",
            }}
          >
            {t("colaboratorRegister.subtitle")}
          </TextRob16Font1S>
        </Box>
      }
      //  sx= estilização do componente pai
      // children= elementos do componente
      // className= estilização do componente
      // isLoading= ativa um loaing na tela
      // title= componente do titulo
      // subtitle= componente do subtitulo
      // keepSubtitle = false= mantem o subtitulo no caso de tela mobile ou pequena
      // sxContainer= estilização do componente children
      // sxTitleSubTitle= estilização do componente title e subtitle
    >
      {Boolean(isLoading) && <AbsoluteBackDrop open />}
      <Stack
        sx={{
          width: "100%",
          gap: "26px",
          borderRadius: "16px",
          boxSizing: "border-box",
        }}
      >
        {
          <Stack
            sx={{
              background: theme[mode].mainBackground,
              borderRadius: "16px",
              width: "100%",
              padding: "24px",
              boxSizing: "border-box",
            }}
          >
            <Stack
              sx={{
                gap: "40px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "24px",
                }}
              >
                <TextRob16Font1S
                  sx={{
                    color: theme[mode].black,
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "24px",
                  }}
                >
                  {t("colaboratorRegister.tableTitle")}
                </TextRob16Font1S>
                <UserTableFilters />
              </Box>
              <UserTable />
            </Stack>
          </Stack>
        }
      </Stack>
      {modalOpen !== null && (
        <Modal
          open={modalOpen !== null}
          onClose={() => setModalOpen(null)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            {modalOpen === "deletedUser" && userToBeDeleted && (
              <ModalDeleteUser
                userToDelete={userToBeDeleted}
                onClose={() => {
                  setModalOpen(null);
                  setUserToBeDeleted(null);
                }}
              />
            )}
          </div>
        </Modal>
      )}
    </ScreenFullPage>
  );
};
