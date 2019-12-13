import React from 'react';

import { PivotItem } from 'office-ui-fabric-react';
import { ThemeContext } from '../../../../themes/theme-context';
import { ContentType, Mode } from '../../../../types/action';
import { Image, Monaco } from '../../common';
import { formatXml } from '../../common/monaco/util/format-xml';
import AdaptiveCard from '../adaptive-cards/AdaptiveCard';
import { darkThemeHostConfig, lightThemeHostConfig } from '../adaptive-cards/AdaptiveHostConfig';
import { Snippets } from '../snippets';

export const getPivotItems = (messages: any,
  body: any,
  verb: string,
  mode: Mode,
  headers: any) => {

  const resultComponent = displayResultComponent(headers, body, verb);

  const pivotItems = [
    <PivotItem
      key='response-preview'
      ariaLabel='Response Preview'
      headerText={messages['Response Preview']}
    >
      {resultComponent}
    </PivotItem>,
    <PivotItem
      key='response-headers'
      ariaLabel='Response Headers'
      headerText={messages['Response Headers']}
    >
      <Monaco body={headers} />
    </PivotItem>
  ];

  if (mode === Mode.Complete) {
    pivotItems.push(
      <PivotItem
        key='adaptive-cards'
        ariaLabel='Adaptive Cards'
        headerText={messages['Adaptive Cards']}
      >
        <ThemeContext.Consumer >
          {(theme) => (
            // @ts-ignore
            <AdaptiveCard
              body={body}
              hostConfig={theme === 'light' ? lightThemeHostConfig : darkThemeHostConfig}
            />
          )}
        </ThemeContext.Consumer>
      </PivotItem>
    );
    pivotItems.push(
      <PivotItem
        key='code-snippets'
        ariaLabel='Code Snippets'
        headerText={messages.Snippets}
      >
        <Snippets />
      </PivotItem>
    );
  }

  return pivotItems;
};

function displayResultComponent(headers: any, body: any, verb: string) {
  const language = 'json';
  if (headers) {
    const contentType = headers['content-type'].split(';')[0];
    switch (contentType) {
      case ContentType.XML:
        return <Monaco body={formatXml(body)} verb={verb} language='xml' />;

      case ContentType.Image:
        return <Image
          styles={{ padding: '10px' }}
          body={body}
          alt='profile image'
        />;

      default:
        return <Monaco body={body} verb={verb} language={language} />;
    }
  }
}



