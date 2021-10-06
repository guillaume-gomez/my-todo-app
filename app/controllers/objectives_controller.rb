class ObjectivesController < ApplicationController
  def index
    respond_to do |format|
      format.json do 
        render json: Objective.all
      end
    end
  end
end
