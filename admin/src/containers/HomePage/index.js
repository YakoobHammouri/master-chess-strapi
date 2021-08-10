/*
 *
 * HomePage
 *
 */
/* eslint-disable */
import React, { memo, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { get, upperFirst } from "lodash";
import { auth, LoadingIndicatorPage } from "strapi-helper-plugin";
import PageTitle from "../../components/PageTitle";
import { useModels } from "../../hooks";

import useFetch from "./hooks";
import {
  ALink,
  Block,
  Container,
  LinkWrapper,
  P,
  Wave,
  Separator,
} from "./components";
import BlogPost from "./BlogPost";
import SocialLink from "./SocialLink";

// const FIRST_BLOCK_LINKS = [
//   {
//     link: "https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html#_4-create-a-category-content-type",
//     contentId: "app.components.plugins.master.chess.service.content",
//     titleId: "app.components.plugins.master.chess.service",
//   },
//   {
//     link: "https://github.com/strapi/foodadvisor",
//     contentId: "app.components.BlockLink.code.content",
//     titleId: "app.components.BlockLink.code",
//   },
// ];

const HomePage = ({ history: { push } }) => {
  const { error, isLoading, posts } = useFetch();
  // Temporary until we develop the menu API
  const {
    collectionTypes,
    singleTypes,
    isLoading: isLoadingForModels,
  } = useModels();

  const handleClick = (e) => {
    e.preventDefault();

    push(
      "/plugins/content-type-builder/content-types/plugins::users-permissions.user?modalType=contentType&kind=collectionType&actionType=create&settingType=base&forTarget=contentType&headerId=content-type-builder.modalForm.contentType.header-create&header_icon_isCustom_1=false&header_icon_name_1=contentType&header_label_1=null"
    );
  };

  const hasAlreadyCreatedContentTypes = useMemo(() => {
    const filterContentTypes = (contentTypes) =>
      contentTypes.filter((c) => c.isDisplayed);

    return (
      filterContentTypes(collectionTypes).length > 1 ||
      filterContentTypes(singleTypes).length > 0
    );
  }, [collectionTypes, singleTypes]);

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  const headerId = hasAlreadyCreatedContentTypes
    ? "HomePage.greetings"
    : "app.components.HomePage.welcome";
  const username = get(auth.getUserInfo(), "firstname", "");
  const linkProps = hasAlreadyCreatedContentTypes
    ? {
        id: "app.components.HomePage.button.blog",
        href: "https://strapi.io/blog/",
        onClick: () => {},
        type: "blog",
        target: "_blank",
      }
    : {
        id: "app.components.HomePage.create",
        href: "",
        onClick: handleClick,
        type: "documentation",
      };

  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {(title) => <PageTitle title={title} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <Block>
              <Wave />
              <FormattedMessage
                id={headerId}
                values={{
                  name: upperFirst(username),
                }}
              >
                {(msg) => <h2 id="mainHeader">{msg}</h2>}
              </FormattedMessage>

              <Separator style={{ marginTop: 37, marginBottom: 36 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <LinkWrapper
                  href={"/admin/plugins/master-chess/service/Attendances"}
                  // target="_blank"
                  key={"/admin/plugins/master-chess/service/Attendances"}
                  type={"chess"}
                >
                  <FormattedMessage
                    id={"app.components.plugins.master.chess.service.content"}
                  >
                    {(title) => (
                      <p className="bold" style={{ paddingTop: 10 }}>
                        {title}
                      </p>
                    )}
                  </FormattedMessage>
                  {/* <FormattedMessage
                    id={"app.components.plugins.master.chess.service.content"}
                  >
                    {(content) => <p>{content}</p>}
                  </FormattedMessage> */}
                </LinkWrapper>
              </div>
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
