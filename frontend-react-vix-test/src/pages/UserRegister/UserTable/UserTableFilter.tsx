import { Box, Stack } from "@mui/material";
import { FilterInput } from "../../../components/Inputs/FilterInput";
import { FilterIcon } from "../../../icons/FilterIcon";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { CheckboxLabel } from "../../../components/CheckboxLabel";

export const UserTableFilters = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const { mspTableFilter, setMspTableFilter, isPocFilter, setIsPocFilter } =
    useZMspRegisterPage();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: "24px",
      }}
    >
      <FilterInput
        icon={<FilterIcon fill={theme[mode].gray} />}
        value={mspTableFilter}
        onChange={setMspTableFilter}
        placeholder={t("colaboratorRegister.companyFilterPlaceholder")}
      />
      <FilterInput
        icon={<FilterIcon fill={theme[mode].gray} />}
        value={mspTableFilter}
        onChange={setMspTableFilter}
        placeholder={t("colaboratorRegister.UserFilterPlaceholder")}
      />
    </Box>
  );
};
