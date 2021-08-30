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
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { serverUrl } from "../../../utils/serverUrl";
import CommentModal from "../components/CommentModal";
import ViewerForm1 from "../components/ViewerForm1";
import ViewerForm2 from "../components/ViewerForm2";
import ViewerForm3 from "../components/ViewerForm3";
import { Delete, Edit } from "@material-ui/icons";
import CommentList from "../components/CommentList";
import PDFExport from "../../../shared/components/PDFExport";

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
    marginBottom: 15
  },
  cardHeader: {
    backgroundColor: theme.palette.tertiary.main,
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
    marginLeft: 10
  },
  divider: {
    marginBottom: 15
  }
}));

function ProjectViewer({ project, projectId, priority, institute }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const handleDelete = () => {
    var newInstitute = { ...institute };
    newInstitute.projects.splice(newInstitute.projects.indexOf(project), 1);
    newInstitute.priority.splice(newInstitute.priority.indexOf(projectId), 1);
    fetch(`${serverUrl}institutes/${institute.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newInstitute),
    }).then(() => {
      history.push("/projects");
    });
  };

  const selectComment = (comment) => {
    setComment(comment);
    setOpen(true);
  };

  const selectForm = (project) => {
    switch (tabIndex) {
      case 0:
        return (
          <ViewerForm1
            project={project}
            investmentReq={null}
            setInvestmentReq={null}
            status={null}
          />
        );
      case 1:
        return (
          <ViewerForm2
            project={project}
            proposedProjectCost={null}
            setProposedProjectCost={null}
            priority={priority}
          />
        );
      case 2:
        return <ViewerForm3 project={project} />;
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
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => {
            history.push(`/projects/${projectId}/edit`);
          }}
          className={classes.button}
        >
          Edit Project
        </Button>
        <Button
          variant="contained"
          startIcon={<Delete />}
          onClick={handleDelete}
          className={classes.button}
        >
          Delete Project
        </Button>
        <PDFExport projects={[project]} filename={project.title} priority={priority}/>
      </Toolbar>
      <Divider classes={{ root: classes.divider }} />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Tabs
              value={tabIndex}
              onChange={(event, index) => setTabIndex(index)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Investment Programming Entry" />
              <Tab label="PAPs Form" />
              <Tab label="PDO Personnel Feedback" />
            </Tabs>
            <Card>
              <CardHeader title={getTitle()} className={classes.cardHeader} />
              <CardContent>{selectForm(project)}</CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider classes={{ root: classes.subDivider }} />
        </Grid>
        <Grid item xs={12}>
          <Card className = {classes.card}>
            <CardHeader title="Comments" className={classes.cardHeader} />
            <CardContent>
              <CommentList
                comments={project.commentList}
                selectComment={selectComment}
              />
            </CardContent>
          </Card>
        </Grid>

        {comment && (
          <CommentModal open={open} setOpen={setOpen} comment={comment} />
        )}
      </Container>
    </React.Fragment>
  );
}

export default ProjectViewer;
