from pydantic import BaseModel, Field

class DataRisk(BaseModel):
    metric_name: str = Field(description="The name of the financial or operational metric")
    current_value: str = Field(description="The current value or status")
    risk_level: str = Field(description="Must be 'Critical', 'Warning', or 'Stable'")
    impact_summary: str = Field(description="A one-sentence summary of the business impact")

class DataExtractionResult(BaseModel):
    anomalies: list[DataRisk] = Field(description="List of identified anomalies in the data")
    recommended_actions: list[str] = Field(description="List of actionable steps based on the data")

class DashboardPayload(BaseModel):
    healthScore: int = Field(description="An aggregate business health score from 0 to 100.")
    critical: list[str] = Field(description="Top 2-3 critical, immediate risks across all data.")
    warnings: list[str] = Field(description="Top 2-3 medium-priority warnings.")
    opportunities: list[str] = Field(description="Top 1-2 positive opportunities for optimization or growth.")
    actions: list[str] = Field(description="Exactly 3 concrete, immediate recommended actions.")

class TextInsight(BaseModel):
    category: str = Field(description="E.g., HR, Operations, Client Relations, Engineering")
    issue_or_opportunity: str = Field(description="A concise summary of the point.")
    severity: str = Field(description="Must be 'High', 'Medium', or 'Low'")

class TextExtractionResult(BaseModel):
    extracted_insights: list[TextInsight] = Field(description="List of critical insights extracted from the text.")
    executive_summary: str = Field(description="A 2-sentence overarching summary of the document.")

class VisionInsight(BaseModel):
    metric_or_issue: str = Field(description="The specific issue visible in the image (e.g., 'AWS Compute Cost Spike').")
    financial_impact: str = Field(description="The numeric or structural impact (e.g., '₹45,000 increase in 7 days').")
    action_required: str = Field(description="The immediate step to mitigate the visual anomaly.")

class VisionExtractionResult(BaseModel):
    visual_anomalies: list[VisionInsight] = Field(description="Critical issues extracted from the image or chart.")
    overall_assessment: str = Field(description="A ruthless one-sentence summary of the visual data's business state.")