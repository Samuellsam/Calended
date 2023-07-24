import CalendedSelect, { DropdownModel } from "../../form/CalendedSelect";
import CalendedTextInput from "../../form/CalendedTextInput";
import CalendedSubmitButton from "../../form/CalendedSubmitButton";
import { useEffect, useState } from "react";
import CalendedForm from "../../form/CalendedForm";
import { Member, MemberViewModel, Team } from "@/interfaces/Team";
import axios from "axios";
import CalendedDatePicker, {
  CALENDED_DATE_PICKER_FORMAT,
} from "../../form/CalendedDatePicker";
import CalendedAlert from "../../form/CalendedAlert";
import {
  AlertModel,
  ERROR_ALERT,
  SUCCESS_ALERT,
  WARNING_ALERT,
} from "@/interfaces/AlertModel";
import CalendedListView from "../CalendedListView";
import MemberListItem from "./MemberListItem";
import moment, { Moment, isMoment } from "moment";

interface MemberCreateForm {
  name: string | null;
  teamId: string | null;
  birthday: Moment | null;
}

const MemberMenu: React.FC<{
  onBack?: () => void;
}> = () => {
  const [memberCreateForm, setMemberCreateForm] = useState<MemberCreateForm>({
    name: null,
    teamId: null,
    birthday: null,
  });

  const [teamOptions, setTeamOptions] = useState<DropdownModel[]>([]);

  const [alert, setAlertMsg] = useState<AlertModel | undefined>();

  const [members, setMembers] = useState<MemberViewModel[]>([]);

  useEffect(() => {
    fetchMembers();
    fetchTeamOptions();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("/api/member/get-all");
      const members: Member[] = response.data.data.members;
      setMembers(
        members.map((m) => {
          return {
            ...m,
            birthday: moment(m.birthday, CALENDED_DATE_PICKER_FORMAT),
          } as MemberViewModel;
        })
      );
    } catch (error) {
      console.log(error);
    }

    return [];
  };

  const fetchTeamOptions = async () => {
    try {
      const response = await axios.get("/api/team/get-all");
      setTeamOptions(
        response.data.data.teams.map((team: Team) => {
          return {
            name: team.name,
            value: team.id,
          } as DropdownModel;
        })
      );
      updateForm(
        response.data.data.teams[0] ? response.data.data.teams[0].id : null,
        "teamId"
      );
    } catch (error) {
      console.log(error);
    }

    return [];
  };

  const updateForm = (
    newValue: string | null | Member | Moment,
    attr: string
  ) => {
    setMemberCreateForm({
      ...memberCreateForm,
      [attr]: newValue,
    });
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setAlertMsg({
      message: "PLEASE WAIT",
      type: WARNING_ALERT,
    });

    try {
      const response = await axios.post("/api/member/save", {
        name: memberCreateForm.name,
        birthday: memberCreateForm.birthday?.format(
          CALENDED_DATE_PICKER_FORMAT
        ),
        teamId: memberCreateForm.teamId,
      });
      await fetchMembers();
      setAlertMsg({
        message: `${response.status} - ${response.data.message}`.toUpperCase(),
        type: SUCCESS_ALERT,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAlertMsg({
          message:
            `${error.response?.status} - ${error.response?.data.message}`.toUpperCase(),
          type: ERROR_ALERT,
        });
      }
    }
  };

  return (
    <>
      <CalendedAlert alert={alert} />
      <hr className="m-1" />
      <CalendedForm onSubmit={(e) => onSubmit(e)}>
        <CalendedTextInput
          header="Member Name"
          mandatory={true}
          onChange={(e) =>
            updateForm(e.target.value ? e.target.value : null, "name")
          }
        />
        <div className="grid grid-cols-4 w-full gap-2">
          <div className="col-span-2">
            <CalendedSelect
              header="Team"
              mandatory={true}
              onChange={(e) =>
                updateForm(e.target.value ? e.target.value : null, "teamId")
              }
              options={teamOptions}
            />
          </div>
          <div className="col-span-2">
            <CalendedDatePicker
              header="Birthday"
              mandatory={true}
              onChange={(e) =>
                updateForm(
                  e.target.value
                    ? moment(e.target.value, CALENDED_DATE_PICKER_FORMAT)
                    : null,
                  "birthday"
                )
              }
            />
          </div>
        </div>
        <CalendedSubmitButton value="Add Member" />
      </CalendedForm>
      <hr className="m-1" />
      <CalendedListView>
        {members.map((m) => (
          <MemberListItem member={m} key={m.id} />
        ))}
      </CalendedListView>
    </>
  );
};

export default MemberMenu;
