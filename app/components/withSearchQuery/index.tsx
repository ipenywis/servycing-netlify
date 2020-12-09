import React, { useEffect, useState } from "react";

export interface IWithSearchQuery {
  searchParams: any;
}

export interface IWithSearchQueryProps {}

export function WithSearchQuery(Component: React.FC<any>) {
  return class SearchQuery extends React.Component {
    state: { searchParams: any };

    constructor(props: any) {
      super(props);
      const params = this.parseQuery();

      this.state = {
        searchParams: params,
      };
    }

    private parseQuery() {
      const search = window.location.search;
      const urlSearchParams = new URLSearchParams(search);
      let params: any = {};
      urlSearchParams.forEach((value, key) => {
        params[key] = value;
      });

      return params;
    }

    render() {
      const { searchParams } = this.state;

      return <Component searchParams={searchParams} />;
    }
  };
}

export function useSearchQuery() {
  const [searchParams, setParams] = useState<any>({});

  const parseQuery = () => {
    const search = window.location.search;
    const urlSearchParams = new URLSearchParams(search);
    let params: any = {};
    urlSearchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  };

  useEffect(() => {
    const params = parseQuery();
    setParams(params);
  }, []);

  return searchParams;
}
