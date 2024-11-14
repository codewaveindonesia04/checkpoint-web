import axios from "axios";

export class ContentfulApiService {
  private contentfulApi;
  private baseUrl = process.env.CONTENTFUL_API_BASE_URL;
  private accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  constructor() {
    this.contentfulApi = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  public getEntries(spaceId: string, environmentId: string) {
    return this.contentfulApi
      .get(`/spaces/${spaceId}/environments/${environmentId}/entries`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching entries:", error);
        throw error;
      });
  }

  public getAssetById(spaceId: string, environmentId: string, assetId: string) {
    return this.contentfulApi.get(
      `/spaces/${spaceId}/environments/${environmentId}/assets/${assetId}?access_token=${this.accessToken}`
    );
  }
}
