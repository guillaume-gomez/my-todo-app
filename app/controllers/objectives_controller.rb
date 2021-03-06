class ObjectivesController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_objective, only: [:update, :destroy]

  def index

    respond_to do |format|
      format.json do 
        render json: Objective.all, include: { key_results: {}}
      end
    end
  end

  def create
    @objective = Objective.new(objective_params)
    if @objective.save
      render json: @objective, include: { key_results: {}}
    else
      render json: @objective.errors
    end
  end

  def update
    @objective.assign_attributes(objective_params)
    if @objective.save
      render json: @objective, include: { key_results: {}}
    else
      render json: @objective.errors
    end
  end

  def destroy
    if @objective.destroy
      render json: @objective
    else
      render json: @objective.errors
    end
  end


  private

  def objective_params
    params.permit(
    :title,
    key_results_attributes: [
      :id,
      :title,
      :_destroy
    ]
  )
  end

  def set_objective
    @objective = Objective.find(params[:id])
  end
end
