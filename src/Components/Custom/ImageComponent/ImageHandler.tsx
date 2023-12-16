import React from 'react';
import IconTag  from './ImageTag';
import { ReactComponent as Api } from '../../../Assets/svgs/AritifactTypes/Apis.svg';
import { ReactComponent as Connection } from '../../../Assets/svgs/AritifactTypes/Connections.svg';
import { ReactComponent as DatabaseSource } from '../../../Assets/svgs/AritifactTypes/DatabaseSource.svg';
import { ReactComponent as Dataflow } from '../../../Assets/svgs/AritifactTypes/Dataflows.svg';
import { ReactComponent as DataModel } from '../../../Assets/svgs/AritifactTypes/DataModel.svg';
import { ReactComponent as Delimited } from '../../../Assets/svgs/AritifactTypes/Delimited.svg';
import { ReactComponent as Excel } from '../../../Assets/svgs/AritifactTypes/Excel.svg';
import { ReactComponent as FixlengthSource } from '../../../Assets/svgs/AritifactTypes/FixLengthSource.svg';
import { ReactComponent as ReportModel } from '../../../Assets/svgs/AritifactTypes/ReportModels.svg';
import { ReactComponent as SharedActions } from '../../../Assets/svgs/AritifactTypes/SharedActions.svg';
import { ReactComponent as Subflows } from '../../../Assets/svgs/AritifactTypes/Subflows.svg';
import { ReactComponent as Workflows } from '../../../Assets/svgs/AritifactTypes/Workflows.svg';

type ArtifactColor = {
  textColour: string;
  fillColour: string;
  borderColour: string;
};

class ImageHandler {
  static createIconTag(
    text: string,
    svgIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    artifactColor: ArtifactColor
  ): React.ReactNode {
    const { textColour, fillColour, borderColour } = artifactColor;

    return (
      <IconTag
        svgicon={svgIcon}
        textColour={textColour}
        fillColour={fillColour}
        borderColour={borderColour}
        text={text}
      />
    );
  }

  static getArtifactIconTag: { [key: string]: React.ReactNode } = {
    ApiEndpoint: ImageHandler.createIconTag("ApiEndpoint", Api, {
      textColour: '#3E527F',
      fillColour: '#BDD0FB',
      borderColour: '#91AFDB',
    }),
    RestApiConnection: ImageHandler.createIconTag("RestApi Connection", Connection, {
      textColour: '#6C8F2B',
      fillColour: '#E6FBBD',
      borderColour: '#B5CE7E',
    }),
    CloudConnection: ImageHandler.createIconTag("Cloud Connection", Connection, {
      textColour: '#6C8F2B',
      fillColour: '#E6FBBD',
      borderColour: '#B5CE7E',
    }),
    DatabaseConnection: ImageHandler.createIconTag("Database Connection", Connection, {
      textColour: '#6C8F2B',
      fillColour: '#E6FBBD',
      borderColour: '#B5CE7E',
    }),
    SharedAction: ImageHandler.createIconTag("SharedAction", SharedActions, {
      textColour: '#773C1E',
      fillColour: '#FFBB99',
      borderColour: '#B78A76',
    }),
    Dataflow: ImageHandler.createIconTag("Dataflow", Dataflow, {
      textColour: '#3E8562',
      fillColour: '#BDFBDC',
      borderColour: '#9CE2BD',
    }),
    Subflow: ImageHandler.createIconTag("Subflow", Subflows, {
      textColour: '#463370',
      fillColour: '#D0BDFB',
      borderColour: '#9486BA',
    }),
    Workflow: ImageHandler.createIconTag("Workflow", Workflows, {
      textColour: '#996C13',
      fillColour: '#FBE9BD',
      borderColour: '#E2BC6F',
    }),
    Datamodel: ImageHandler.createIconTag("Datamodel", DataModel, {
      textColour: '#844747',
      fillColour: '#FFC0C0',
      borderColour: '#CE9595',
    }),
    ReportModel: ImageHandler.createIconTag("ReportModel", ReportModel, {
      textColour: '#8C640D',
      fillColour: '#FFD278',
      borderColour: '#B29C69',
    }),
    ExcelSource: ImageHandler.createIconTag("Excel Source", Excel, {
      textColour: '#3E4F23',
      fillColour: '#9DA898',
      borderColour: '#536644',
    }),
    DatabaseSource: ImageHandler.createIconTag("Database Source", DatabaseSource, {
      textColour: '#067A7A',
      fillColour: '#B3F2F2',
      borderColour: '#4B7F7D'
    }),
    DelimitedSource: ImageHandler.createIconTag("Delimited Source", Delimited, {
        textColour: '#712A7F',
        fillColour: '#E57AB7',
        borderColour: '#83468E',
      }),
    FixedLengthSource: ImageHandler.createIconTag("Fixlength Source", FixlengthSource, {
        textColour: '#4C4008',
        fillColour: '#A5997F',
        borderColour: '#6D5F39',
      }),
};

}
export default ImageHandler;
