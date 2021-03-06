import {
  Button,
  Container,
  Grid,
  Typography,
  Card,
  makeStyles,
  Divider,
  Tabs,
  CardHeader,
  Tab,
  CardContent,
  Toolbar,
  ButtonGroup,
} from "@material-ui/core";
import {
  AddCircleOutline,
  Cancel,
  CheckCircle,
  Description,
  Domain,
  Edit,
  Save,
  Settings,
} from "@material-ui/icons";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import CommentModal from "../components/CommentModal";
import ViewerForm1 from "../components/ViewerForm1";
import ViewerForm2 from "../components/ViewerForm2";
import ViewerForm3 from "../components/ViewerForm3";
import EditorForm3 from "../components/EditorForm3";
import CreateCommentDialog from "../components/CreateCommentDialog";
import CommentList from "../components/CommentList";
import PDFExport from "../../../shared/components/PDFExport";
import { Admin } from "../../../utils/bulsupis_mw";
import { elForm1Validator } from "../../../utils/elForm1Validator";
import { elForm2Validator } from "../../../utils/elForm2Validator";
import elForm3Validator from "../../../utils/elForm3Validator";
import AppBreadcrumb from "../../../shared/components/AppBreadcrumb";
import { SnackbarContext } from "../../../contexts/SnackbarContext";

const useStyles = makeStyles((theme) => ({
  txt: {
    padding: "10px",
  },
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
  },
  card: {
    marginBottom: 15,
  },
  cardHeader: {
    background: "linear-gradient(45deg, #800000 30%, #FF8E53 110%)",
    color: "white",
  },
  pageTitle: {
    flexGrow: 11,
  },
  pageAction: {
    flexGrow: 1,
  },
  subDivider: {
    margin: "20px 0px 20px 0px",
  },
  button: {
    marginLeft: 10,
  },
  buttonGroup: {
    margin: "0px 0px 0px 10px",
  },
  divider: {
    marginBottom: 15,
  },
  appoveButtonRaised: {
    backgroundColor: "#81C784",
    "&:hover": {
      backgroundColor: "#81C784",
    },
  },
  reviseButtonRaised: {
    backgroundColor: "#FFB74D",
    "&:hover": {
      backgroundColor: "#FFB74D",
    },
  },
  rejectButtonRaised: {
    backgroundColor: "#E57373",
    "&:hover": {
      backgroundColor: "#E57373",
    },
  },
  appoveButton: {
    "&:hover": {
      backgroundColor: "#81C784",
    },
  },
  reviseButton: {
    "&:hover": {
      backgroundColor: "#FFB74D",
    },
  },
  rejectButton: {
    "&:hover": {
      backgroundColor: "#E57373",
    },
  },
  cardHeaderAction: {
    margin: "auto",
  },
}));

function ElevatedProjectViewer({ project, priority, instituteId }) {
  const classes = useStyles();
  const history = useHistory();
  const { setShowSnackbar, setSnackbarData } = useContext(SnackbarContext);

  const [open, setOpen] = useState(false);
  const [addCommentOpen, setAddCommentOpen] = useState(false);
  const [showForm3Editor, setShowForm3Editor] = useState(false);
  const [comment, setComment] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const [proposedProjectCost, setProposedProjectCost] = useState(
    project.proposedProjectCost
  );
  const [investmentReq, setInvestmentReq] = useState(project.investmentReq);
  const [status, setStatus] = useState(project.status);
  const [form3Data, setForm3Data] = useState({
    recievedBy: project.recievedBy,
    recieverDesignation: project.recieverDesignation,
    dateRecieved: project.dateRecieved,
  });
  const [newComments, setNewComments] = useState([]);
  const [PDOSignature, setPDOSignature] = useState([]);
  const [oldPDOSignature, setOldPDOSignature] = useState(
    project.pdoSignature ? [project.pdoSignature] : []
  );

  const [checkerForm1, setCheckerForm1] = useState({
    investmentReq: [
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
    ],
  });
  const [checkerForm2, setCheckerForm2] = useState({
    proposedProjectCost: [
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
    ],
  });
  const [checkerForm3, setCheckerForm3] = useState({
    recievedBy: {
      error: false,
      messages: [],
    },
    recieverDesignation: {
      error: false,
      messages: [],
    },
  });

  const selectComment = (comment) => {
    setComment(comment);
    setOpen(true);
  };

  const handleSubmit = () => {
    Admin.Projects.edit(
      {
        ...project,
        proposedProjectCost,
        investmentReq,
        status,
        ...form3Data,
        pdoSignature: oldPDOSignature.length ? oldPDOSignature[0] : null,
      },
      PDOSignature
    )
      .then(({ simple, full }) => {
        if (simple) {
          setSnackbarData({
            type: 0,
            message: "Project action saved",
          });
          history.push(`/institutes/${instituteId}`);
        } else {
          setSnackbarData({
            type: 3,
            message: "Failed to save project action",
          });
        }
      })
      .catch((err) => {
        setSnackbarData({
          type: 3,
          message: err.message,
        });
        history.push(`/institutes/${instituteId}`);
      })
      .finally(() => setShowSnackbar(true));
  };

  const selectForm = (project) => {
    switch (tabIndex) {
      case 0:
        return (
          <ViewerForm1
            project={project}
            investmentReq={investmentReq}
            setInvestmentReq={setInvestmentReq}
            status={status}
            checkerForm1={checkerForm1}
          />
        );
      case 1:
        return (
          <ViewerForm2
            project={project}
            proposedProjectCost={proposedProjectCost}
            setProposedProjectCost={setProposedProjectCost}
            priority={priority}
            checkerForm2={checkerForm2}
          />
        );
      case 2:
        return showForm3Editor ? (
          <EditorForm3
            form3Data={form3Data}
            setForm3Data={setForm3Data}
            PDOSignature={PDOSignature}
            setPDOSignature={setPDOSignature}
            oldPDOSignature={oldPDOSignature ? oldPDOSignature : []}
            setOldPDOSignature={setOldPDOSignature}
            checkerForm3={checkerForm3}
          />
        ) : (
          <ViewerForm3
            project={{
              ...project,
              ...form3Data,
              pdoSignature: oldPDOSignature[0],
            }}
            PDOSignature={PDOSignature}
          />
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (tabIndex) {
      case 0:
        return "Investment Programming Entry";
      case 1:
        return "PAPs Form";
      case 2:
        return "PDO Personnel Feedback";
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h4" className={classes.pageTitle}>
          {"Project Viewer"}
        </Typography>
        <ButtonGroup
          className={classes.buttonGroup}
          size="medium"
          variant="contained"
        >
          <Button
            variant={status == 3 ? "contained" : "text"}
            startIcon={<CheckCircle />}
            onClick={() => {
              setStatus(3);
            }}
            classes={{
              contained: classes.appoveButtonRaised,
              text: classes.appoveButton,
            }}
          >
            Approve
          </Button>
          <Button
            variant={status == 2 ? "contained" : "text"}
            startIcon={<Edit />}
            onClick={() => {
              setStatus(2);
            }}
            classes={{
              contained: classes.reviseButtonRaised,
              text: classes.reviseButton,
            }}
          >
            Revise
          </Button>
          <Button
            variant={status == 0 ? "contained" : "text"}
            startIcon={<Cancel />}
            onClick={() => {
              setStatus(0);
            }}
            classes={{
              contained: classes.rejectButtonRaised,
              text: classes.rejectButton,
            }}
          >
            Reject
          </Button>
        </ButtonGroup>
        {tabIndex === 2 && project.dateRecieved === undefined && (
          <Button
            variant="contained"
            onClick={() => {
              setForm3Data({
                ...form3Data,
                dateRecieved: new Date().toISOString(),
              });
              setShowForm3Editor(!showForm3Editor);
            }}
            startIcon={showForm3Editor ? <CheckCircle /> : <Edit />}
            className={classes.button}
          >
            {showForm3Editor ? "Done" : "Edit"}
          </Button>
        )}
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => {
            switch (tabIndex) {
              case 0:
                let checker1 = elForm1Validator(investmentReq);
                if (
                  checker1.investmentReq
                    .map((item) => !item.error)
                    .reduce((a, b) => a && b)
                ) {
                  handleSubmit();
                }
                setCheckerForm1(checker1);
                break;
              case 1:
                let checker2 = elForm2Validator(proposedProjectCost);
                if (
                  checker2.proposedProjectCost
                    .map((item) => !item.error)
                    .reduce((a, b) => a && b)
                ) {
                  handleSubmit();
                }
                setCheckerForm2(checker2);
                break;
              case 2:
                let checker3 = elForm3Validator(form3Data);
                if (
                  !checker3.recievedBy.error &&
                  !checker3.recieverDesignation.error
                ) {
                  handleSubmit();
                } else {
                  setShowForm3Editor(true);
                }
                setCheckerForm3(checker3);
                break;
            }
          }}
          className={classes.button}
        >
          Save Changes
        </Button>
        <PDFExport
          projects={[project]}
          filename={project.title}
          priority={priority}
        />
      </Toolbar>
      <AppBreadcrumb
        links={[
          {
            link: "/institutes",
            label: "Institutes",
            icon: <Domain fontSize="small" />,
          },
          {
            link: `/institutes/${instituteId}`,
            label: project.institute.institute,
            icon: <Settings fontSize="small" />,
          },
          {
            link: `/institutes/${instituteId}/${project.id}`,
            label: project.title,
            icon: <Description fontSize="small" />,
          },
        ]}
      />
      <Divider classes={{ root: classes.divider }} />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Tabs
              value={tabIndex}
              onChange={(event, index) => {
                switch (tabIndex) {
                  case 0:
                    let checker1 = elForm1Validator(investmentReq);
                    if (
                      checker1.investmentReq
                        .map((item) => !item.error)
                        .reduce((a, b) => a && b)
                    ) {
                      setTabIndex(index);
                    }
                    setCheckerForm1(checker1);
                    break;
                  case 1:
                    let checker2 = elForm2Validator(proposedProjectCost);
                    if (
                      checker2.proposedProjectCost
                        .map((item) => !item.error)
                        .reduce((a, b) => a && b)
                    ) {
                      setTabIndex(index);
                    }
                    setCheckerForm2(checker2);
                    break;
                  case 2:
                    let checker3 = elForm3Validator(form3Data);
                    console.log(form3Data);
                    console.log(checker3);
                    if (
                      !checker3.recievedBy.error &&
                      !checker3.recieverDesignation.error
                    ) {
                      setTabIndex(index);
                    } else {
                      setShowForm3Editor(true);
                    }
                    setCheckerForm3(checker3);
                    break;
                }
              }}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Investment Programming Entry" />
              <Tab label="PAPs Form" />
              <Tab label="PDO Personnel Feedback" />
            </Tabs>
            {selectForm(project)}
          </Grid>
          <Grid item xs={12}>
            <Divider classes={{ root: classes.subDivider }} />
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                title="Comments"
                className={classes.cardHeader}
                classes={{
                  action: classes.cardHeaderAction,
                }}
                action={
                  <Button
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={() => {
                      setAddCommentOpen(true);
                    }}
                  >
                    ADD
                  </Button>
                }
              />
              <CardContent>
                <CommentList
                  comments={project.commentList}
                  newComments={newComments}
                  selectComment={selectComment}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {comment && (
          <CommentModal open={open} setOpen={setOpen} comment={comment} />
        )}
        <CreateCommentDialog
          open={addCommentOpen}
          setAddCommentOpen={setAddCommentOpen}
          comments={newComments}
          setComments={setNewComments}
          projectId={project.id}
        />
      </Container>
    </React.Fragment>
  );
}

export default ElevatedProjectViewer;
